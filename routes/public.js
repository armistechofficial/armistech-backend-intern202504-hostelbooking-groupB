import {Router} from "express";

//creates a new instance of the router
const publicRouter= Router();

//a get method for booking page
publicRouter.get("/booking",(req,res)=>{
  res.send("Welcome to booking page!");
})

export { publicRouter }