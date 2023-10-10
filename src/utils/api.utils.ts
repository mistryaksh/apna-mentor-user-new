export const baseQueryUser = {
     baseUrl: process.env.REACT_APP_URL,
     prepareHeaders: (headers: Headers) => {
          headers.set("Authorization", (localStorage.getItem("user_token") as string) || `{}`);
     },
};
export const baseQueryMentor = {
     baseUrl: process.env.REACT_APP_URL,
     prepareHeaders: (headers: Headers) => {
          headers.set("Authorization", (localStorage.getItem("mentor_token") as string) || `{}`);
     },
};

export const GetLocalToken = localStorage.getItem("user_token");
