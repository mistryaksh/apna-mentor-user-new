import io from "socket.io-client";
// API call to create meeting

export const SocketIo = io("https://truthful-amber-slip.glitch.me");
SocketIo.connect();
