import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    message: String,
    sender: String,
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session"
    },
})
module.exports = mongoose.model("Chat", chatSchema);