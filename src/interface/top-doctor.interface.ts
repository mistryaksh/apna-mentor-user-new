export interface IDoctorProps {
     name: {
          firstName: string;
          lastName: string;
          gender: "male" | "female" | "not_to_say";
     };
     contact: {
          mobile: string;
          email: string;
          address: string;
     };
     workDetails: {
          hospital: {
               name: string;
               specialization: string[];
               address: string;
          };
     };
     authDetails: {
          username: string;
          password: string;
     };
     role?: "doctor";
     online?: boolean;
     verified?: boolean;
     block?: boolean;
     rating?: number;
     comments?: {
          userId: string;
          body: string;
     }[];
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}

export interface TopDoctorsProps {
     doctorId: IDoctorProps;
     active: boolean;
     createdAt?: string;
     updatedAt?: string;
     _id?: string;
}
