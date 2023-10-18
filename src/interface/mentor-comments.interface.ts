import { UserProps } from "./account.interface";
import { IMentorLoginProps } from "./mentor.interface";

export interface MentorCommentProps {
     userId: UserProps | string | any;
     doctorId: IMentorLoginProps | string | any;
     body: {
          star?: string;
          desc: string;
     };
     validByDoctor?: boolean;
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}
