// routes/contact.js
//importing express dependency 
import express from "express";
//importing the createmessage function from controllers contact.js
import { createMessage } from "../controllers/contact.js";

//assigning router
const contactRouter = express.Router();

//a post function to create messages for contact us
contactRouter.post("/", createMessage);

export { contactRouter };





