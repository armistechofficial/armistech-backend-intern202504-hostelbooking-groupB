import { getUser } from "../services/auth.js";

//authentication to check if the user is logged in or not (i.e. member or normal)
const checkForAuthentication = async(req,res,next)=>{
    const authorizationHeaderValue = req.headers["authorization"];
    req.user = null;
    if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer"))
        {
            return null;
        }
    const token = authorizationHeaderValue.split("Bearer ")[1];
    const user = getUser(token);

    req.user = user;
    return next();
}

//authorization for routes according to the user roles
const restrictTo = (roles =[]) =>{
    return (req, res, next) =>{
        if(!req.user){
            return res.status(403).json(
                {
                    message: "Login first"
                }
            );
        }

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

export { checkForAuthentication, restrictTo };