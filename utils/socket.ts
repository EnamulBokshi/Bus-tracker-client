import { io } from "socket.io-client";

const socket = io("http://localhost:5500");

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("connection_error", (err) => {
  console.log(err);
})

export default socket;