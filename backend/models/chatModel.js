import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    chats: [{
        message: { type: String, required: true },
        sender: { type: String, required: true }, 
        seen: {type: Boolean, default:false},
        timestamp: { type: Date, default: Date.now }
    }],
    date: { type: Date, default: Date.now }
});

const chatModel = mongoose.models.chats || mongoose.model('chats', chatSchema);

export default chatModel;
