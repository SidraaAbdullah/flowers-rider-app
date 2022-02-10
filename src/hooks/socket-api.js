import { URL } from "../constants";
import socketIOClient from "socket.io-client";

export const getOrderStatus = (item, setResponse) => {
  const socket = socketIOClient(URL);
  socket.on(`${item._id}_statusUpdate`, (data) => {
    setResponse(data);
  });
  // CLEAN UP THE EFFECT
  return () => socket.disconnect();
};
