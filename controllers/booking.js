import { booking } from "../models/booking.js";

const createBooking = async(req, res) =>{
    console.log("Testing booking creation...");

    const { personalDetails, residenceDetails, contactDetails, paymentDetails, taxDetails, summary } = req.body;
        const route = req.route.path;
        
        const email = contactDetails?.email;
        const contactNumber = contactDetails?.contactNumber;

        //checking if the email and contact number is provided by the user for booking
        if (!email || !contactNumber) {
            return res.status(400).json(
                { message: "Email and contact number are required." }
            );
        }

    try
    {
        let newBooking;

        if(route =="/booking/personal-details"){
            //checking if the booking already exists with the given number and email
            const existingBooking = await booking.findOne({ "contactDetails.email": email, "contactDetails.contactNumber": contactNumber });
            if (existingBooking) {
                return res.status(400).json(
                    { message: "The booking with these credential has already been made." }
                );
            }

            const { nationalId, firstName, lastName } = personalDetails;
            const { address, city, country, postalCode } = residenceDetails;

            newBooking = await booking.create({
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