import yup from "yup";

const userSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(20).required(),
});

export { userSchema };

