import {Router} from "express";
import { restrictTo } from "../middlewares/auth.js";
import { createBooking, getBookings, getBookingById, deleteBooking, updateBooking } from "../controllers/booking.js";

//creates a new instance of the router
const protectedRouter = Router();

//listing routes for all the protected pages
protectedRouter.get("/booking", restrictTo(["customer"]), (req, res) => {
  res.status(200).json
  (
    { message: "Booking data for logged-in customer only" }
  );
});

//get method to show info message for the users 
protectedRouter.get("/booking/personal-details", restrictTo(["customer"]), (req, res) => {
  res.status(200).json
  (
    { message: "Please enter your personal details" }
  );
});
//get method to show the payment message for the users
protectedRouter.get("/booking/:bookingId/payment-details", restrictTo(["customer"]), (req, res) => {
  res.status(200).json
  (
    { message: "Please enter your credit details" }
  );
});

//only customers can access these routes
//routes for every steps of booking
protectedRouter.post("/booking/personal-details", restrictTo(["customer"]), createBooking);
protectedRouter.post("/booking/:bookingId/payment-details", restrictTo(["customer"]), createBooking);
protectedRouter.post("/booking/:bookingId/tax-details", restrictTo(["customer"]), createBooking);
protectedRouter.post("/booking/:bookingId/receipt", restrictTo(["customer"]), createBooking);
protectedRouter.get("/booking/records", restrictTo(["customer"]), getBookings);
protectedRouter.get("/booking/:bookingId/records", restrictTo(["customer"]), getBookingById);
protectedRouter.delete("/booking/:bookingId", restrictTo(["customer"]), deleteBooking);
protectedRouter.put("/booking/:bookingId", restrictTo(["customer"]), updateBooking);

//export booking route instance
export {protectedRouter};



