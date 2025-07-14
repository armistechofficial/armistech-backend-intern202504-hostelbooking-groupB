import { booking } from "../models/booking.js";
import { hostel } from "../models/hostel.js";

//includes the step-by-step creation logic of booking: personal details, payment details, tax details, bill summary
const createBooking = async(req, res) =>{
    console.log("Testing booking creation...");

    const { personalDetails, residenceDetails, contactDetails, paymentDetails, taxDetails, receipt, bookingId} = req.body;
    const route = req.route.path;
    const userId = req.user._id;
    const {hostelId} = req.body;

    //try-catch to check the routes and assign the instance likewise 
    try
    {
        //user profile information used to create a first instance which will later update into other 
        if(route === "/booking/personal-details"){

            const foundHostel = await hostel.findById(hostelId);
            if (!foundHostel) {
                return res.status(400).json(
                    { message: "Invalid hostelId: Hostel not found." }
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
        else if(route === "/booking/payment-details"){

            if (!bookingId) {
                return res.status(400).json(
                    { message: "Booking ID is required for payment update." }
                );
            }
            const baseAmount = 13000;
            const fullPaymentDetails = {
                ...paymentDetails,
                baseAmount: baseAmount
            };
            //updates the existing booking data with payment details to same booking object with booking id
            const updatedBooking = await booking.findOneAndUpdate(
                { user: userId, _id: bookingId, },
                { paymentDetails: fullPaymentDetails },
                { new: true, runValidators: true }
            );

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
        else if(route === "/booking/tax-details"){
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

            const baseAmount = bookingData.hostel?.price || 13000;
            const vatRate = 0.13; // 13% VAT
            const vatAmount = baseAmount * vatRate;
            const marketingCharge = taxDetails?.marketingCharge || 100;
            const taxes = taxDetails?.taxes || 0;
            const totalAmount = baseAmount + vatAmount;

            //updating the booking model with the tax details
            const updatedBooking = await booking.findOneAndUpdate(
                { user: userId, _id: bookingId, },
                { 
                    taxDetails:{
                        vat: vatAmount,
                        marketingCharge: marketingCharge,
                        taxes: taxes,
                    },
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
        else if(route === "/booking/receipt"){
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

            const { orderNumber, numberOfGuests, checkInDate, checkOutDate } = receipt;
            const hostel = bookingData.hostel;
            const address = bookingData.residenceDetails?.address || "Kathmandu, Nepal";

            const baseAmount = bookingData.hostel?.price || 13000;
            const vatAmount = bookingData.taxDetails?.vat || 0;
            const taxes = bookingData.taxDetails?.taxes || 0;
            const totalAmount = baseAmount + vatAmount + taxes;

            //updating the booking model with the receipt details
            const updatedBooking = await booking.findOneAndUpdate(
                { user: userId, _id: bookingId, },
                { 
                    receipt:{
                        orderNumber,
                        address,
                        hostel:{
                            name: hostel?.name,
                            location: hostel?.location,
                            price: hostel?.price,
                            facilities: hostel?.facilities
                        },
                        numberOfGuests,
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
                        balanceAmount: bookingData.paymentDetails?.baseAmount || 13000,
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
            { user: userId, _id: req.query.bookingId }
        ).select('-__v').populate("hostel");

        if (!bookings.length) {
            return res.status(404).json(
                { message: "No bookings found." }
            );
        }

        return res.status(200).json(
            { message: "Bookings retrieved successfully", data: bookings }
        );
    } catch (error) {
        return res.status(500).json(
            { message: "Error retrieving bookings", error: error.message }
        );
    }
};

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
        const { personalDetails, residenceDetails, contactDetails, paymentDetails, taxDetails, receipt } = req.body;

        //finding the existing booking
        const existingBooking = await booking.findOne(
            { user: userId, _id: bookingId }
        );

        if (!existingBooking) {
            return res.status(404).json(
                { message: "Booking not found or unauthorized." }
            );
        }

        //preparing update data with recalculations
        const updateData = {};
        if (personalDetails)updateData.personalDetails = personalDetails;
        if (residenceDetails)updateData.residenceDetails = residenceDetails;
        if (contactDetails)updateData.contactDetails = contactDetails;
        if (paymentDetails){
            const baseAmount = paymentDetails.baseAmount || 13000;
            updateData.paymentDetails = {...paymentDetails, baseAmount};
        }
        if (taxDetails) {
            const baseAmount = existingBooking.paymentDetails?.baseAmount || (updateData.paymentDetails?.baseAmount || 13000);
            const vatRate = 0.13;
            const vatAmount = baseAmount * vatRate;
            updateData.taxDetails = {
                ...taxDetails,
                vat: vatAmount,
                marketingCharge: taxDetails.marketingCharge || 100,
                taxes: taxDetails.taxes || 0,
            };
            updateData.totalAmount = baseAmount + vatAmount + (taxDetails.taxes || 0);
        }
        if (receipt){
            updateData.receipt = {
                ...receipt,
                address: receipt.address || existingBooking.residenceDetails?.address || "Kathmandu, Nepal",
            };
            updateData.status = receipt.status || existingBooking.status;
            // Recalculate totalAmount if taxDetails is also updated
            if (taxDetails) {
                const baseAmount =existingBooking.paymentDetails?.baseAmount || (updateData.paymentDetails?.baseAmount || 13000);
                const vatAmount =(baseAmount * 0.13);
                updateData.totalAmount = baseAmount + vatAmount +(taxDetails.taxes || 0);
            }
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

export { createBooking, getBookings, deleteBooking, updateBooking };



