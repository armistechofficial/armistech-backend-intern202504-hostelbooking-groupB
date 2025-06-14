const validation = (schema) => async (req,res,next) =>{
    //stores the object sent in the signin form 
    const body = req.body;

    try{
        await schema.validate(body, { abortEarly: false });
        return next();
    }
    catch(error){
        return res.status(400).json(
            { message: "Please correct the following errors", errors: error.errors }
        );
    }
}

export { validation };