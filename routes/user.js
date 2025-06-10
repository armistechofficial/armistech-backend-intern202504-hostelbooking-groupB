import {Router} from "express";
import { registerUser, loginUser} from "../controllers/user.js";

const authRouter = Router();

authRouter.get("/signup", (req, res) => {
  res.send("Welcome to the sign up page!");
});

authRouter.get("/login", (req, res) => {
  res.send("Welcome to the login page!");
});

//the second variable aligns with the functions of req, res
authRouter.post("/signup", registerUser);
authRouter.post("/login", loginUser);

export {authRouter}