import express from "express";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.routes.js";
import cors from "cors";
import dbConnect from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/chat", chatRoutes);

async function server() {
    try {
        await dbConnect();
        app.listen(3000, () => {
            console.log("listening on port 3000");
        })

    }
    catch (err) {
        console.error("failed to connect to server", err);
    }
}
server();
export default app;