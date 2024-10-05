import chatModel from "../models/chatModel.js";
import userModel from "../models/userModel.js";

const getAllChats = async (req, res) => {
    try {
      const chats = await chatModel.find();
      res.json({ success: true, chats });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: 'Error fetching chats' });
    }
  };

  const userChat = async (req, res) => {
    const { userId, message } = req.body;
    if (!userId || !message) {
        return res.json({ success: false, message: 'UserId and message are required' });
    }

    try {

        const user = await userModel.findById(userId); 
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        let chat = await chatModel.findOne({ userId });

        if (!chat) {
            chat = new chatModel({
                userId,
                name: user.name,  
                chats: [{ message, sender: 'user' }]
            });
        } else {

            chat.chats.push({ message, sender: 'user' });
        }
        await chat.save();

        res.json({ success: true, chat });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Error sending chat message' });
    }
};


const adminChat = async (req, res) => {
    const {userId, message } = req.body;

    if (!userId || !message) {
        return res.json({success:false, message: 'UserId and message are required' });
    }

    try {
        let chat = await chatModel.findOne({ userId });
        if (!chat) {
            return res.json({success:false, message: 'Chat with user not found' });
        }
        chat.chats.push({ message, sender: 'admin' });
        await chat.save();
        res.json({success:true, chat});
    } catch (error) {
        console.error(error);
        res.json({success:false, message: 'Error sending admin message' });
    }
};
const getUserChats = async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.json({ success: false, message: 'UserId is required' });
    }
    try {
        const userChats = await chatModel.findOne({ userId });
        if (userChats) {
            await chatModel.updateMany({ userId, "chats.seen": false }, { $set: { "chats.$[].seen": true } });
            return res.json({ success: true, chats: userChats.chats });
        } else {
            return res.json({ success: false, message: 'No chats found for this user' });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Error fetching user chats', error: error.message });
    }
};

const getMessageCount = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await chatModel.findOne({userId});
        const seenMessages = user.chats.filter((chat) => chat.sender === 'admin' && chat.seen === false);
        const messageCount = seenMessages.length;
        res.json({ success: true, messageCount});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}




export { userChat, adminChat, getAllChats, getUserChats, getMessageCount };
