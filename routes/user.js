import {Router} from "express";
import { registerUser, loginUser} from "../controllers/user.js";
import { validation } from "../middlewares/userValidation.js";
import { userSchema } from "../utils/userValidation.js";

//creates a new instance of the router
const authRouter = Router();

//simple response for signup route
authRouter.get("/signup", (req, res) => {
  res.send("Welcome to the sign up page!");
});

//simple response for login route
authRouter.get("/login", (req, res) => {
  res.send("Welcome to the login page!");
});

//the validation middleware with user as the parameter has been used to check the user object details
//the second variable aligns with the functions of req, res
authRouter.post("/signup", validation(userSchema), registerUser);
authRouter.post("/login", loginUser);

//export the assigned router instance
export {authRouter}

