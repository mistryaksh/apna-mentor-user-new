import { UserProps } from "./account.interface";
import { IDoctorProps } from "./top-doctor.interface";

export interface IChatProps {
     roomId: string;
     userOne: UserProps;
     userTwo: IDoctorProps;
     message: [
          {
               id: String;
               message: String;
               senderId: String;
               senderName: String;
               timestamp: String;
               topic: String;
          }
     ];
     status: callType;

     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}

export type callType = "REJECTED" | "ONGOING" | "COMPLETED" | "PENDING";
