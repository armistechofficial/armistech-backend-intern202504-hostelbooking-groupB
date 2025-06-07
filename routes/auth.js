import {Router} from "express";
import { registerUser } from "../controllers/auth";
import {loginUser} from "../controllers/auth";

const authRouter = Router();

//the second variable aligns with the functions of req, res
authRouter.post("/signup", registerUser);
authRouter.post("/login", loginUser);

export {authRouter}