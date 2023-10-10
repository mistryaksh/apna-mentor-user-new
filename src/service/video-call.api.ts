import io from "socket.io-client";

//Auth token we will use to generate a meeting and connect to it
export const authToken: string =
     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJhMTQwMTM4YS1kODQ2LTQ0MzUtYjkzMC0yMjNlZDUwNDVkZDAiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5Njc1Nzg5OSwiZXhwIjoxNjk2ODQ0Mjk5fQ.l8eryBnNtxQM9yOK8ml2465ZUyURzZKLOtI87OKr1uQ";

// API call to create meeting

export const SocketIo = io("http://localhost:8080");
SocketIo.connect();
