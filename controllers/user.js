//import user schema from the model package
import { user } from "../models/user.js";

const registerUser = async(req, res) =>{
    console.log("Testing registration...");
    try
    {
        const { firstName, lastName, email, password} = req.body;
        const newUser = await user.create({
            firstName,
            lastName,
            email,
            password,
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

const loginUser = async(req,res) =>{
    console.log("Testing login...");
    try
    {
        const {email, password} = req.body;
        const storedUser = await user.findOne
        (
            {email, password}
        );

        //checking whether the user exists or not
        if(!storedUser){
            return res.status(404).json
            (
                { message: "User not found" }
            );
        }

        return res.status(200).json
        (
            { message: "Login successful", user: storedUser }
        );
    }
    catch(error){
        return res.status(500).json
        (
            { message: "Error logging user", error: error.message }
        );
    }
}

export {registerUser, loginUser}