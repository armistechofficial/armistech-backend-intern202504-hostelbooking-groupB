import { getUser } from "../services/auth.js";

//authentication to check if the user is logged in or not (i.e. member or normal)
const checkForAuthentication = async(req,res,next)=>{
    const authorizationHeaderValue = req.headers["authorization"];
    req.user = null;
    if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer"))
        {
            return res.status(401).json({
                message: "Access denied. Please log in first.",
            });
        }
    const token = authorizationHeaderValue.split("Bearer ")[1];
    const user = getUser(token);

    req.user = user;
    return next();
}

//authorization for routes according to the user roles
const restrictTo = (roles =[]) =>{
    return (req, res, next) =>{
        //checks if the user is logged in or not
        if(!req.user){
            return res.status(403).json(
                {
                    message: "Login first"
                }
            );
        }

        //checks if the role matches with the pre-defined roles or not
        if(!roles.includes(req.user.role)){
            return res.status(403).json(
                {
                    message: "Unauthorized permission"
                }
            ); 
        }

        return next();
    }

}

//exporting the methods as a middleware
export { checkForAuthentication, restrictTo };
