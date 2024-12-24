import express from "express";

import { connectDb } from "./db-utils/mongoose-connection.js";
import mentorRouter from "./routes/mentors.js";
 import studentRouter from "./routes/students.js";
const server = express();
server.use(express.json());
 server.use("/mentor",mentorRouter);
 server.use("/student",studentRouter);
const PORT = 4500;

await connectDb();
server.listen(PORT, () => {
    console.log("server listening on", PORT);
});