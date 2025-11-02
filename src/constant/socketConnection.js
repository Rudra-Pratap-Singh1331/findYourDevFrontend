// socketService.js
import { io } from "socket.io-client";

export const createSocket = () => {
  // Always create a fresh socket instance
  let socket;
  if (location.hostname === "localhost") {
    socket = io("http://localhost:1001", { withCredentials: true });
  } else {
    socket = io("/", { path: "/api/socket.io" });
  }
  // Optional: return cleanup function if needed
  const disconnect = () => {
    if (socket) {
      socket.disconnect();
    }
  };

  return { socket, disconnect };
};
