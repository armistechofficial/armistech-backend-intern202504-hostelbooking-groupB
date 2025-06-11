import {Router} from "express";
import { registerUser, loginUser} from "../controllers/user.js";
import { validation } from "../middlewares/userValidation.js";
import { userSchema } from "../utils/userValidation.js";

const authRouter = Router();

//the validation middleware with user as the parameter has been used to check the user object details
authRouter.get("/signup", validation(userSchema), (req, res) => {
  res.send("Welcome to the sign up page!");
});

authRouter.get("/login", (req, res) => {
  res.send("Welcome to the login page!");
});

//the second variable aligns with the functions of req, res
authRouter.post("/signup", registerUser);
authRouter.post("/login", loginUser);

export {authRouter}
