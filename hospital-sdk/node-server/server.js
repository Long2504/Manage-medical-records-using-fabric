import "dotenv/config";

import connection from "./src/db.js";
import express from "express";
import route from "./src/routes/index.route.js";
import cors from "cors";
import moment from "moment";
import { logger } from "./src/utils/logger.js";
import useragent from "useragent";
const app = express();

(async () => await connection())();

const corsOptions = {
    //To allow requests from client
    origin: true,
    credentials: true,
};
moment.locale("vi");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", cors(corsOptions), route);
app.get("/123", (req, res) => {
    res.send("Hello World!");
  });
  
  
const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () => {
    console.log(`Listening on port ${port}...`)
    logger.info(`Server running at http://45.32.28.204:${port}/`);
});
