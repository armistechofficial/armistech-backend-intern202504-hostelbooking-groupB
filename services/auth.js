//imports jsonwebtoken to handle JWT creation and verification
import jwt from "jsonwebtoken";

//secret key used to sign and verify JWTs
const secretKey = "ArmishGroupB$$33";

//function to return a token containing the user's _id, email, and role
const setUser = (user) =>{
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    },secretKey);
};

//function to verify a given token and decode the user data
const getUser = (token) =>{
    if(!token){
        return null;
    }
    return jwt.verify(token, secretKey);
};

//export functions 
export {setUser, getUser};