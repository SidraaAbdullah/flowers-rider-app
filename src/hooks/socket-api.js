import { URL } from "../constants";
import { io } from "socket.io-client";
const socket = io(`${URL}/driver`, {
  reconnectionDelayMax: 10000,
  // auth: {
  //   token: "123",
  // },
  // query: {
  //   "my-key": "my-value",
  // },
});

export const getSocketData = (name, setResponse) => {
  socket.on(name, (data) => {
    setResponse(data);
  });
  // CLEAN UP THE EFFECT
  return () => socket.disconnect();
};
