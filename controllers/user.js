//import user schema from the model package
import { user } from "../models/user.js";
import { setUser } from "../services/auth.js";
import { hashPassword, comparePassword } from "../utils/password.js";

//function to register the user with password encryption
const registerUser = async(req, res) =>{
    console.log("Testing registration...");
    try
    {
        const { firstName, lastName, email, password} = req.body;

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json(
                { message: "User with email already registered" }
            );
        }

        //encrypting the password through hashing
        const hashedPassword = await hashPassword(password);
        const newUser = await user.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        return res.status(201).json
        (
            { message: "User registered successfully", user: newUser }
        );
    }
    catch(error){
        return res.status(500).json
        (
            { message: "Error registering user", error: error.message }
        );
    }
};

//function to give user stateless access to the system (JWT-based)
const loginUser = async(req,res) =>{
    console.log("Testing login...");
    try
    {
        const {email, password} = req.body;
        const storedUser = await user.findOne
        (
            {email}
        );

        //checking whether the user exists or not
        if(!storedUser){
            return res.status(404).json
            (
                { message: "User not found" }
            );
        }

        //to do bcrypt.compare(plaintext, hash password)
        const isPasswordValid = await comparePassword(password, storedUser.password);

        if(!isPasswordValid){
            return res.status(401).json
            (
                { message: "Invalid password" }
            );
        }

        const token = setUser(storedUser);
        //res.cookie("uid", token);
        console.log(token);
        return res.status(200).json
        (
            { message: "Login successful", token: token, }
        );
    }
    catch(error){
        return res.status(500).json
        (
            { message: "Error logging user", error: error.message }
        );
    }
}

//export user authentication functions 
export {registerUser, loginUser}