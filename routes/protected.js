import {Router} from "express";
import { restrictTo } from "../middlewares/auth.js";

const protectedRouter = Router();

//listing routes for all the protected pages
protectedRouter.get("/booking", restrictTo(["customer"]), (req, res) => {
  res.status(200).json
  (
    { message: "Booking data for logged-in customer only" }
  );
});

protectedRouter.post("/booking", restrictTo(["customer"]), (req, res) => {
  res.status(201).json
  (
    { message: "Booking successfully created"}
  );
});

export {protectedRouter};


