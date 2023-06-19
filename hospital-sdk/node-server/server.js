import "dotenv/config";

import connection from "./src/db.js";
import express from "express";
import route from "./src/routes/index.route.js";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import moment from "moment";
import { logger } from "./src/utils/logger.js";

const app = express();

(async () => await connection())();
const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         methods: ["GET", "POST"],
//     },
// }); // socket.io
const corsOptions = {
    //To allow requests from client
    origin: true,
    credentials: true,
};
moment.locale("vi");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", cors(corsOptions), route);
// io.on("connection", (socket) => {
//     console.log("a user connected");

//     socket.on("join", (room) => {
//         console.log("join room", room);
//         socket.join(room);
//     });

//     socket.on("disconnect", () => {
//         console.log("user disconnected");
//         socket.disconnect();
//     });
// });

const port = process.env.PORT || 8081;
app.listen(port, "0.0.0.0", () => {
    console.log(`Listening on port ${port}...`)
    logger.info(`Server running at http://45.32.28.204:${port}/`);
});
