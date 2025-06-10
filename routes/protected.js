import {Router} from "express";

const protectedRouter = Router();

//listing routes for all the protected pages
protectedRouter.get("/booking", (req, res) => {
  res.status(200).json
  (
    { message: "Booking data for logged-in user only" }
  );
});

protectedRouter.post("/booking", (req, res) => {
  res.status(201).json
  (
    { message: "Booking created"}
  );
});

export {protectedRouter};


