import {Router} from "express";
import { restrictTo } from "../middlewares/auth.js";
import { createBooking } from "../controllers/booking.js";

//creates a new instance of the router
const protectedRouter = Router();

//listing routes for all the protected pages
protectedRouter.get("/booking", restrictTo(["customer"]), (req, res) => {
  res.status(200).json
  (
    { message: "Booking data for logged-in customer only" }
  );
});

//only customers can access these routes
//routes for every steps of booking
protectedRouter.post("/booking/personal-details", restrictTo(["customer"]), createBooking);
protectedRouter.post("/booking/payment-details", restrictTo(["customer"]), createBooking);
protectedRouter.post("/booking/tax-details", restrictTo(["customer"]), createBooking);
protectedRouter.post("/booking/receipt", restrictTo(["customer"]), createBooking);

//export booking route instance
export {protectedRouter};


