import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET_URL); // We'll set this in .env
export default socket;
