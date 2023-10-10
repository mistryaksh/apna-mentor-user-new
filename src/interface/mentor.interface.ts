export interface IMentorLoginProps {
     username: string;
     password: string;
}

export interface IMentorProps {
     name: {
          firstName: string;
          lastName: string;
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
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}
