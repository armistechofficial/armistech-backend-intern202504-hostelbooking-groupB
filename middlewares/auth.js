import { getUser } from "../services/auth.js";

const restrictedToLoggedInUser = async(req, res, next) =>{
    const userUid = req.cookies?.uid;
    if(!userUid){
        return res.status(401).json
        (
             {message: "Please log in to access this page"}
        );
    }

    const user = getUser(userUid);

    if(!user){
        return res.status(404).json
            (
                { message: "User not found" }
            );
    }

    req.user = user;
    next();
};

export { restrictedToLoggedInUser };