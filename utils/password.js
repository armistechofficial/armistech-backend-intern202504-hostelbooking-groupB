import bcrypt from "bcrypt";

//the salt is set to 10 after $ sign when hashed
const hashPassword = async (password) =>{
    return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hash) =>{
    return await bcrypt.compare(password, hash);
};

export { hashPassword, comparePassword };