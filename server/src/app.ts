import express from "express";
import cors from "cors";
// import { v4 as uuidv4 } from "uuid";
import { Server } from "socket.io";
import { router } from "./router";
import { Message } from "./types";

// localhost 5173 에서만 접속 가능
const ALLOWED_ORIGINS = ["http://localhost:5001"];
const PORT = process.env.PORT || 5002;

const app = express();
app.use(router);
app.use(cors());

const expressServer = app.listen(PORT, () =>
  console.log(`Server is listening on ${PORT}`),
);
const io = new Server(expressServer, {
  cors: {
    origin: ALLOWED_ORIGINS,
  },
});

io.on("connection", (socket) => {
  // logger
  const logger = (text: string) => {
    const message = `Message from server: ${text}`;
    socket.emit("logger", message);
  };

  socket.on("message", (message: string) => {
    logger(`Client said: ${message}`);
    socket.broadcast.emit("message", message);
  });
});
