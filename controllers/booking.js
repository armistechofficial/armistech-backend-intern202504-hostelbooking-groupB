//import booking function from booking model
import { booking } from "../models/booking.js";
//importing hostel function from hostel model
import { hostel } from "../models/hostel.js";
//importing room category schema from the roomcategory model
import RoomCategory from "../models/roomCategory.js";

//includes the step-by-step creation logic of booking: personal details, payment details, tax details, bill summary
const createBooking = async(req, res) =>{
    console.log("Testing booking creation...");

    const { personalDetails, residenceDetails, contactDetails, paymentDetails, taxDetails, receipt} = req.body;
    const route = req.route.path;
    const userId = req.user._id;
    const {hostelId, roomCategory} = req.body;
    const bookingId = req.params.bookingId;

    //try-catch to check the routes and assign the instance likewise 
    try
    {
        //user profile information used to create a first instance which will later update into other 
        if(route === "/booking/personal-details"){

            //cehcsk if the enetered hostel id exists or not
            const foundHostel = await hostel.findById(hostelId);
            if (!foundHostel) {
                return res.status(400).json(
                    { message: "Invalid hostelId: Hostel not found." }
                );
            }

            //checks if the room category is available or not
            const selectedRoomCategory = await RoomCategory.findById(roomCategory);
            if (!selectedRoomCategory) {
                return res.status(400).json(
                    { message: "Room category not found." }
                );
            }

            //checks if the entered room belongs to the hostel selected
            const isRoomInHostel = foundHostel.rooms.some(
            (roomId) => roomId.toString() === roomCategory.toString()
            );
            //displays message if the room does not belong to the hostel
            if (!isRoomInHostel) {
                return res.status(400).json(
                    {
                        message: "Selected room category does not belong to the specified hostel."
                    }
                );
            }

            const { nationalId, firstName, lastName } = personalDetails;
            const { address, city, country, postalCode } = residenceDetails;
            const {contactNumber, email} = contactDetails;

            //booking instance with only personal details
            const newBooking = await booking.create({
                        user: userId,
                        hostel: hostelId,
                        personalDetails: { 
                            nationalId, 
                            firstName, 
                            lastName 
                        },
                        residenceDetails: { 
                            address, 
                            city, 
                            country, 
                            postalCode 
                        },
                        contactDetails: { 
                            contactNumber, 
                            email 
                        },
                    });
                    return res.status(201).json(
                        {
                        message: "Personal details saved successfully",
                        bookingId: newBooking._id, 
                        }
                    );
        }
        //adds on payment details of user 
        else if(route.endsWith("/payment-details")){

            if (!bookingId) {
                return res.status(400).json(
                    { message: "Booking ID is required for payment update." }
                );
            }
            const existingBooking = await booking.findById(bookingId).populate("hostel");
            const fullPaymentDetails = {
                ...paymentDetails,
            };
            //updates the existing booking data with payment details to same booking object with booking id
            const updatedBooking = await booking.findOneAndUpdate(
                { user: userId, _id: bookingId, },
                { paymentDetails: fullPaymentDetails },
                { new: true, runValidators: true }
            );
            //if the booking is not found
            if (!updatedBooking) {
                return res.status(404).json(
                    { message: "Booking not found: Please make a booking first." }
                );
            }

            return res.status(200).json(
                {
                    message: "Payment details saved successfully",
                    bookingId: updatedBooking._id,
                }
            );
        }
        //updates the existing booking data with tax details to same booking object with booking id
        else if(route.endsWith("/tax-details")){
            if (!bookingId) {
                return res.status(400).json(
                    { message: "Booking ID is required for payment update." }
                );
            }

            const bookingData = await booking.findOne({ user: userId, _id: bookingId }).populate("hostel");

            if(!bookingData){
                return res.status(404).json(
                    { message: "Booking not found: Please make a booking first." }
                );
            }

            if (!bookingData.paymentDetails) {
                return res.status(400).json(
                    { message: "Please complete payment details before setting tax details." }
                );
            }

            //the request variable for the base amount
            const { numberOfGuests } = req.body; 

            //all the calculations of the tax details summary display
            const baseAmount = bookingData.hostel?.price * numberOfGuests;
            const vatRate = 0.13; // 13% VAT
            const vatAmount = baseAmount * vatRate;
            const marketingCharge = 100;
            const taxes = 10;
            const totalAmount = baseAmount + vatAmount + marketingCharge;

            //prepared a different tax object to store
            const calculatedTaxDetails = {
                vat: vatAmount,
                marketingCharge: marketingCharge,
                taxes: taxes,
                numberOfGuests: numberOfGuests
            };

            //updating the booking model with the tax details
            const updatedBooking = await booking.findOneAndUpdate(
                { user: userId, _id: bookingId, },
                { 
                    taxDetails: calculatedTaxDetails,
                    totalAmount: totalAmount,
                },
                { new: true, runValidators: true }
            );

            return res.status(200).json({
                message: "Tax details saved successfully",
                bookingId: updatedBooking._id,
                orderSummary: {
                    balanceAmount: baseAmount,
                    vat: vatAmount,
                    totalAmount: totalAmount,
                    hostelMarketing: marketingCharge,
                }
            });
        }
        //updates the existing booking data with receipt to same booking object with booking id
        else if(route.endsWith("/receipt")){
            if (!bookingId) {
                return res.status(400).json(
                    { message: "Booking ID is required to generate receipt." }
                );
            }

            const bookingData = await booking.findOne({ user: userId, _id: bookingId }).populate("hostel");

            if(!bookingData){
                return res.status(404).json(
                    { message: "Booking not found: Please make a booking first." }
                );
            }

            //needed variables for the summary receipt
            const { orderNumber, checkInDate, checkOutDate } = receipt;
            //recalculates the variables
            const numberOfGuests = bookingData.taxDetails?.numberOfGuests;  
            const hostel = bookingData.hostel;
            const address = bookingData.residenceDetails?.address || "Kathmandu, Nepal";
            const marketingCharge = bookingData.taxDetails?.marketingCharge || 100;
            const baseAmount = (hostel?.price || 13000) * numberOfGuests;
            const vatAmount = bookingData.taxDetails?.vat || 0;
            const taxes = bookingData.taxDetails?.taxes || 0;
            const totalAmount = baseAmount + vatAmount + taxes + marketingCharge;

            //updating the booking model with the receipt details
            const updatedBooking = await booking.findOneAndUpdate(
                { user: userId, _id: bookingId, },
                { 
                    receipt:{
                        orderNumber,
                        address,
                        hostel:{
                            name: bookingData.hostel?.name,
                            location: bookingData.hostel?.location,
                            price: bookingData.hostel?.price,
                            facilities: bookingData.hostel?.facilities
                        },
                        checkInDate,
                        checkOutDate,
                    },
                    status: "completed",
                    totalAmount: totalAmount,
                },
                { new: true, runValidators: true }
            );

            return res.status(200).json(
                {
                    message: "Receipt summary generated successfully",
                    bookingId: updatedBooking._id,
                    receipt: {
                        orderNumber: orderNumber,
                        address: hostel?.location,
                        dateAndTime: bookingData.receipt?.dateAndTime,
                        hostel: {
                            name: hostel?.name,
                            location: hostel?.location,
                            price: hostel?.price,
                            facilities: hostel?.facilities
                        },
                        numberOfGuests: numberOfGuests,
                        checkInDate: checkInDate,
                        checkOutDate: checkOutDate,
                        balanceAmount: baseAmount,
                        vat: bookingData.taxDetails?.vat || 0,
                        taxes: bookingData.taxDetails?.taxes || 0,
                        totalAmount: totalAmount, 
                    },
                }
            );
        }
    }
    catch(error){
        return res.status(500).json
        (
            { message: "Error creating booking", error: error.message }
        );
    }

};

//searches the booking details of the user along with the booking id 
const getBookings = async (req, res) => {
    try {
        const userId = req.user._id;
        //excludes the __v metadata for the clean structure
        const bookings = await booking.find(
            { user: userId}
        ).select('-__v').populate("hostel");

        if (!bookings.length) {
            return res.status(404).json(
                { message: "No bookings found." }
            );
        }

        return res.status(200).json(
            { message: "Bookings retrieved successfully", AllBookingdata: bookings }
        );
    } catch (error) {
        return res.status(500).json(
            { message: "Error retrieving bookings", error: error.message }
        );
    }
};

//creates a function to display booking details of the provided id
const getBookingById = async (req, res) => {
    try {
        const userId = req.user._id;
        const bookingId = req.params.bookingId; 

        //displays message if the booking id is not 
        if (!bookingId) {
            return res.status(400).json({ message: "Booking ID is required." });
        }

        //finds the booking data by the user and the booking id 
        const bookingData = await booking.findOne({ user: userId, _id: bookingId })
            .select('-__v')
            .populate('hostel');

        if (!bookingData) {
            return res.status(404).json({ message: "Booking not found." });
        }

        return res.status(200).json({
            message: "Booking retrieved successfully",
            BookingData: bookingData,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving booking", error: error.message });
    }
};

//a function to delete the existing booking data of the user
const deleteBooking = async (req, res) => {
    try {
        const userId = req.user._id;
        const bookingId = req.params.bookingId; 

        const deletedBooking = await booking.findOneAndDelete(
            { user: userId, _id: bookingId }
        );

        if (!deletedBooking) {
            return res.status(404).json(
                { message: "The booking is not found." }
            );
        }

        return res.status(200).json(
            { message: "Booking deleted successfully", bookingId: bookingId }
        );
    } catch (error) {
        return res.status(500).json(
            { message: "Error deleting booking", error: error.message }
        );
    }
};

//function to update the booking records of the customers 
const updateBooking = async (req, res) => {
    try {
        const userId = req.user._id;
        const bookingId = req.params.bookingId;
        const { personalDetails, residenceDetails, contactDetails, paymentDetails, taxDetails, receipt, hostel: updatedHostelId, roomCategory: updatedRoomCategory} = req.body;

        //finding the existing booking
        const existingBooking = await booking.findOne(
            { user: userId, _id: bookingId }
        );

        //if booking does not exists it informs the user as not found
        if (!existingBooking) {
            return res.status(404).json(
                { message: "Booking not found or unauthorized." }
            )
        }

        //converts the hostel object into string 
        const hostelIdToCheck = updatedHostelId || existingBooking.hostel.toString();
        //checks if the hostel to be updated belongs to the id or not
        const foundHostel = await hostel.findById(hostelIdToCheck);
        // Check if hostel exists
        if (!foundHostel) {
            return res.status(400).json(
                { message: "Invalid hostelId." }
            );
        }

        // Check if updated room category belongs to the hostel
        if (updatedRoomCategory) {
            //checks if room category belongs to the found hostel rooms
            const isRoomInHostel = foundHostel.rooms.some(
                (roomId) => roomId.toString() === updatedRoomCategory
            );
            //displays message if the room does not belong to the hostel
            if (!isRoomInHostel) {
                return res.status(400).json({
                    message: "Selected room category does not belong to the specified hostel."
                });
            }
        }
        //preparing update data with recalculations
        const updateData = {};
        //declaring variabled for the calculations
        const guestCount = existingBooking.receipt?.numberOfGuests || 1;
        const baseAmount = (paymentDetails?.baseAmount) || existingBooking.paymentDetails?.baseAmount || (foundHostel.price * guestCount) || 13000;
        const vatRate = 0.13;
        const vatAmount = baseAmount * vatRate;
        const marketingCharge = existingBooking.taxDetails.marketingCharge || 100;
        const taxes = existingBooking.taxDetails.taxes || 0;
        const totalAmount = baseAmount + vatAmount + taxes + marketingCharge;

        //unchanged schema data 
        if (personalDetails)updateData.personalDetails = personalDetails;
        if (residenceDetails)updateData.residenceDetails = residenceDetails;
        if (contactDetails)updateData.contactDetails = contactDetails;
        if (paymentDetails){
            updateData.paymentDetails = {...paymentDetails, baseAmount};
        }
        if (taxDetails) {
            updateData.taxDetails = {
                vat: vatAmount,
                marketingCharge: marketingCharge,
                taxes: taxes
            };
            updateData.totalAmount = totalAmount;
        }
        if (receipt){
            updateData.receipt = {
                ...receipt,
                address: receipt.address || existingBooking.residenceDetails?.address || "Kathmandu, Nepal",
            };
            updateData.status = receipt.status || existingBooking.status;
        }

        // Perform the update
        const updatedBooking = await booking.findOneAndUpdate(
            { user: userId, _id: bookingId },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            message: "Booking updated successfully",
            bookingId: updatedBooking._id,
            data: updatedBooking,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error updating booking", error: error.message });
    }
};

//exports the CRUD functions of booking
export { createBooking, getBookings, getBookingById, deleteBooking, updateBooking };



