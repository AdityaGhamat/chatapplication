import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { ServerConfig } from "./config";
import cors from "cors";
import apiRoutes from "./routes";
import cookieParser from "cookie-parser";
const app = express();
const server = createServer(app);
const io = new Server(server, {});
io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);
  socket.on("disconnect", () => {
    console.log("`user disconnected");
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use("/api", apiRoutes); //http://localhost:3000/api
server.listen(ServerConfig.PORT, () => {
  console.log(
    `server up and running on http://localhost:${ServerConfig.PORT}/`
  );
});
