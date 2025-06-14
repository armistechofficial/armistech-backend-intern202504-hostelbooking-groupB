import {Router} from "express";
import { registerUser, loginUser} from "../controllers/user.js";
import { validation } from "../middlewares/userValidation.js";
import { userSchema } from "../utils/userValidation.js";

const authRouter = Router();


authRouter.get("/signup", (req, res) => {
  res.send("Welcome to the sign up page!");
});

authRouter.get("/login", (req, res) => {
  res.send("Welcome to the login page!");
});

//the validation middleware with user as the parameter has been used to check the user object details
//the second variable aligns with the functions of req, res
authRouter.post("/signup", validation(userSchema), registerUser);
authRouter.post("/login", loginUser);

export {authRouter}
