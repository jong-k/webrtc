import express from "express";
import cors from "cors";
// import { v4 as uuidv4 } from "uuid";
import { Server } from "socket.io";
import { router } from "./router";

// localhost 8001 에서만 접속 가능
const ALLOWED_ORIGINS = ["http://localhost:8001"];
const PORT = process.env.PORT || 8000;

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
  socket.on("message", (message: any) => {
    console.log("message from client", message);
    socket.broadcast.emit("message", message); // sender 이외 전체에 event 발신
  });

  socket.on("bye", () => {
    console.log("received bye");
  });
});
