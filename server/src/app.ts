import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import twilio from "twilio";

const PORT = process.env.PORT || 5002;
import { Server } from "socket.io";
import { router } from "./router";
// localhost 5173 에서만 접속 가능
const ALLOWED_ORIGINS = ["http://localhost:5173"];

const app = express();
app.use(router);
app.use(cors());

const expressServer = app.listen(PORT, () =>
  console.log(`Server is listening on ${PORT}`),
);
const io = new Server(expressServer, {
  cors: {
    origin: ALLOWED_ORIGINS,
    methods: ["GET", "POST"],
  },
});
