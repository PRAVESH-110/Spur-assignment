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
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        })

    }
    catch (err) {
        console.error("failed to connect to server", err);
    }
}
server();
export default app;