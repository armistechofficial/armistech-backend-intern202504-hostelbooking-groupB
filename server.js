import express from "express";
import {connectDB} from "./config/mongodb.js";
import {authRouter} from "./routes/user.js";
import { protectedRouter } from "./routes/protected.js";
import { publicRouter } from "./routes/public.js";
import cookieParser from "cookie-parser";
import { checkForAuthentication} from "./middlewares/auth.js";

//instance of the express
const app = express();
//port number the server will listen on
const port = 7000;

//it is used as an express middleware for incoming requests to work with json
app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use("/user", authRouter);

//public routes can be accessed by anyone
app.use("/api", publicRouter);

//ensuring the users logged in can use these routes
app.use("/api", checkForAuthentication, protectedRouter);

//app.get(para1, para2, para3) where first is blank path, second and third is the function run in the path i.e. 
//request and response
app.get("/", (req, res) => {
    res.send("Hi Express.js server for user");
    //this gets executed when user visits http://localhost:7000 or http://localhost:7000/
  })

//listens to the port 
app.listen(port, async () => {
    console.log(`App listening on port ${port}`);
    await connectDB();
  })


