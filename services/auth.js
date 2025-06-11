import jwt from "jsonwebtoken";
const secretKey = "ArmishGroupB$$33";

const setUser = (user) =>{
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    },secretKey);
};

const getUser = (token) =>{
    if(!token){
        return null;
    }
    return jwt.verify(token, secretKey);
};

export {setUser, getUser};