import {Router} from "express";
import { restrictTo } from "../middlewares/auth.js";
import { createBooking } from "../controllers/booking.js";

const protectedRouter = Router();

//listing routes for all the protected pages
protectedRouter.get("/booking", restrictTo(["customer"]), (req, res) => {
  res.status(200).json
  (
    { message: "Booking data for logged-in customer only" }
  );
});

protectedRouter.post("/booking/personal-details", restrictTo(["customer"]), createBooking);
protectedRouter.post("/booking/payment-details", restrictTo(["customer"]), createBooking);
protectedRouter.post("/booking/tax-details", restrictTo(["customer"]), createBooking);

export {protectedRouter};


