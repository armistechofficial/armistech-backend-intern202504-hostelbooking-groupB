import yup from "yup";

const nameRegex = /^[A-Za-z\s\-]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const userSchema = yup.object({
    firstName: yup.string().required("First name is required").matches(nameRegex, "First name must be only alphabetic"),
    lastName: yup.string().required("Last name is required").matches(nameRegex, "Last name must be only alphabetic"),
    email: yup.string().email("Email must be valid").required("Email is required"),
    password: yup.string().min(4).max(20).required("Password is required").matches(passwordRegex, "Password must be valid"),
});

export { userSchema };

