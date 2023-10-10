import { object, string } from "yup";

export const initialLoginValues = {
     mobile: "8669026894",
     password: "abc123",
};

export const LoginValidationSchema = object().shape({
     mobile: string()
          .required("Please enter mobile number")
          .min(10, "Enter valid mobile number")
          .max(10, "Enter valid mobile number"),
     password: string().required("Please enter password").min(6),
});

export const ProfileValidationSchema = object().shape({
     firstName: string().required("first name is required"),
     lastName: string().required("lastName is required"),
     mobile: string().required("mobile number is required").min(10).max(10),
     email: string().required("email address is required"),
});
