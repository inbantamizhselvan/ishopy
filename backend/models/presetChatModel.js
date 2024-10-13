import mongoose from "mongoose";

const presetChatSchema = new mongoose.Schema({
    question: { type: String, required: true },
    responses: [{ type: String, required: true }],
    keywords: [{ type: String, required: true }] 
});

const presetChatModel = mongoose.models.presetChats || mongoose.model('presetChats', presetChatSchema);
export default presetChatModel;