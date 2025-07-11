import bcrypt from "bcrypt";

//the salt is set to 10 after $ sign when hashed
const hashPassword = async (password) =>{
    return await bcrypt.hash(password, 10);
};

//function to compare hashing passwords 
const comparePassword = async (password, hash) =>{
    return await bcrypt.compare(password, hash);
};

//exports the bcrypt functions
export { hashPassword, comparePassword };