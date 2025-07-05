import { booking } from "../models/booking.js";

const createBooking = async(req, res) =>{
    console.log("Testing booking creation...");

    const { personalDetails, residenceDetails, contactDetails, paymentDetails, taxDetails, receipt, bookingId} = req.body;
    const route = req.route.path;
    const userId = req.user._id;

    try
    {

        if(route === "/booking/personal-details"){

            const { nationalId, firstName, lastName } = personalDetails;
            const { address, city, country, postalCode } = residenceDetails;
            const {contactNumber, email} = contactDetails;

            const newBooking = await booking.create({
                        user: userId,
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
            //updates the existing booking details with payment details by first finding with booking id
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
        else if(route === "/booking/tax-details"){
            if (!bookingId) {
                return res.status(400).json(
                    { message: "Booking ID is required for payment update." }
                );
            }

            const bookingData = await booking.findOne({ user: userId, _id: bookingId });

            if(!bookingData){
                return res.status(404).json(
                    { message: "Booking not found: Please make a booking first." }
                );
            }

            const baseAmount = bookingData.paymentDetails?.baseAmount || 13000;
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
        else if(route === "/booking/receipt"){
            if (!bookingId) {
                return res.status(400).json(
                    { message: "Booking ID is required to generate receipt." }
                );
            }

            const bookingData = await booking.findOne({ user: userId, _id: bookingId });

            if(!bookingData){
                return res.status(404).json(
                    { message: "Booking not found: Please make a booking first." }
                );
            }

            const { orderNumber, hostel, numberOfGuests, checkInDate, checkOutDate } = receipt;
            const address = bookingData.residenceDetails?.address || "Kathmandu, Nepal";

            const baseAmount = bookingData.paymentDetails?.baseAmount || 13000;
            const vatAmount = bookingData.taxDetails?.vat || 0;
            const marketingCharge = bookingData.taxDetails?.marketingCharge || 0;
            const taxes = bookingData.taxDetails?.taxes || 0;
            const totalAmount = baseAmount + vatAmount + taxes;

            //updating the booking model with the receipt details
            const updatedBooking = await booking.findOneAndUpdate(
                { user: userId, _id: bookingId, },
                { 
                    receipt:{
                        orderNumber,
                        address,
                        hostel,
                        numberOfGuests,
                        checkInDate,
                        checkOutDate,
                    },
                    status: "completed",
                    totalAmount: (bookingData.taxDetails?.totalAmount || 0) + (bookingData.taxDetails?.taxes || 0),
                },
                { new: true, runValidators: true }
            );

            return res.status(200).json(
                {
                    message: "Receipt summary generated successfully",
                    bookingId: updatedBooking._id,
                    receipt: {
                        orderNumber: orderNumber,
                        address: address,
                        dateAndTime: bookingData.receipt?.dateAndTime,
                        hostel: hostel,
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

export {createBooking}