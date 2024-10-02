import subEmailModel from "../models/subEmailModel.js";
import userModel from "../models/userModel.js";
import { sendEmailToSubscribers } from "./sendEmailController.js";


// Function to subscribe email
export const subEmail = async (req, res) => {
    try {
        const { email, userId } = req.body;
        const user = await userModel.findOne({ _id: userId });
        if (!user) {
            return res.json({success:false, message: 'User not found' });
        }
        const subEmailData = {
            name: user.name,  
            email: email,
        };
        const existingSub = await subEmailModel.findOne({ email });
        if (existingSub) {
            return res.json({status:false, message: 'Email already subscribed' });
        }
        const subUserEmail = new subEmailModel(subEmailData);
        await subUserEmail.save();
        const emailMessage = `Hello ${user.name},\n\nThank you for subscribing to our newsletter!\n\nThank you,\nIShopY.`
        const emailHTML = `<p>Hello <b>${user.name}</b>,</p>
        <p>Thank you for subscribing to our newsletter!</p>
        <p>Thank you,<br><b>IShopY</b>.</p>`
        const subject = "NewsLetter Subscription";
        await sendEmailToSubscribers(email, user.name, subject, emailMessage, emailHTML);
        res.json({success:true, message: 'Subscribed successfully' });
    } catch (error) {
        res.json({success:false, message: 'Server error', error });
    }
};
