import { object, string } from "yup";
import { IMentorLoginProps, IMentorProps } from "../interface";

export const MentorLoginInitialState: IMentorLoginProps = {
     password: "",
     username: "",
};

export const MentorLoginValidationSchema = object().shape({
     username: string().required("please enter username"),
     password: string().required("please enter password"),
});
