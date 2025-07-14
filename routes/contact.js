// routes/contact.js
import express from "express";
import { createMessage } from "../controllers/contact.js";

const contactRouter = express.Router();

contactRouter.post("/", createMessage);

export { contactRouter };





