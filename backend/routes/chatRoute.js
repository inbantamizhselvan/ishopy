import express from "express";
import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";
import { adminChat, getAllChats, getMessageCount, getUserChats, userChat } from "../controllers/chatController.js";


const chatRouter = express.Router();

chatRouter.get('/all', adminAuth, getAllChats);
chatRouter.post('/admin', adminAuth, adminChat);
chatRouter.post('/user', authUser, userChat);
chatRouter.post('/userchats', authUser, getUserChats);
chatRouter.post('/messagecount', authUser, getMessageCount);

export default chatRouter;