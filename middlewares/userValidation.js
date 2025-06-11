const validation = (schema) => async (req,res) =>{
    //stores the object sent in the signin form 
    const body = req.body;

    try{
        await schema.validate(body);
        next();
        return next();
    }
    catch(error){
        return res.status(400).json(
            { message: "Validation failed" }
        );
    }
}

export { validation };