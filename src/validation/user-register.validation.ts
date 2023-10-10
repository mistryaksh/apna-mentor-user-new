import { object, string } from "yup";
import { RegisterProps } from "../interface";

export const RegisterInitialValues: RegisterProps = {
     email: "",
     mobile: "",
     firstName: "",
     lastName: "",
     password: "",
};

export const RegisterValidationSchema = object().shape({
     password: string().required("password is required").min(6),
     firstName: string().required("first name is required"),
     lastName: string().required("lastName is required"),
     mobile: string().required("mobile number is required").min(10).max(10),
     email: string().required("email address is required"),
});
