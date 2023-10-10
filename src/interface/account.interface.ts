export interface LoginProps {
     mobile: string;
     password: string;
}

export interface RegisterProps {
     firstName: string;
     lastName: string;
     email: string;
     mobile: string;
     password: string;
}

export interface UserProps {
     name: {
          firstName: string;
          lastName: string;
     };
     email: string;
     mobile: string;
     password: string;
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}
