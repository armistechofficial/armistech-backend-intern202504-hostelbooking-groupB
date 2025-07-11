import yup from "yup";

//regular expression rules for name and password
const nameRegex = /^[A-Za-z\s\-]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//yup object schema for validating user signup input
const userSchema = yup.object({
    firstName: yup.string().required("First name is required").matches(nameRegex, "First name must be only alphabetic"),
    lastName: yup.string().required("Last name is required").matches(nameRegex, "Last name must be only alphabetic"),
    email: yup.string().email("Email must be valid").required("Email is required"),
    password: yup.string().min(4).max(20).required("Password is required").matches(passwordRegex, "Password must be valid"),
});

//export the schema to be used in validation middleware
export { userSchema };

