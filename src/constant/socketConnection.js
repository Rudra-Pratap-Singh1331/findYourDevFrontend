// socketService.js
import { io } from "socket.io-client";

export const createSocket = () => {
  let socket;

  if (location.hostname === "localhost") {
    // Local development
    socket = io("http://localhost:1001", { withCredentials: true });
  } else {
    // Production (Render backend)
    socket = io("https://findyourdev.onrender.com", {
      withCredentials: true,
      transports: ["websocket"],
    });
  }

  const disconnect = () => {
    if (socket) socket.disconnect();
  };

  return { socket, disconnect };
};
