import io from "socket.io-client";
// API call to create meeting

export const SocketIo = io("http://35.171.78.89:8080");
SocketIo.connect();
