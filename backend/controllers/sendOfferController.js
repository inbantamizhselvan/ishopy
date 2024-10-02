import subEmailModel from "../models/subEmailModel.js";
import { sendEmailToSubscribers } from "./sendEmailController.js";

const sendOffers = async (req, res) => {
  try {
    const {offerMessage, subject} = req.body;

    const subscribers = await subEmailModel.find({});
    if (!subscribers || subscribers.length === 0) {
      return res.json({ success: false, message: "No subscribers found" });
    }
    const offerHTML = `
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color: #4CAF50;">Special Offer Just for You!</h1>
        <p style="font-size: 16px;">${offerMessage}</p>
        <p style="font-size: 14px; color: #555;">Thank you for being a valued subscriber!</p>
        <p>Thank You,<br><strong>IShopY Team</strong></p>
      </body>
    </html>
  `;

    for (const subscriber of subscribers) {
      const email = subscriber.email;
      const name = subscriber.name;

      try {
        await sendEmailToSubscribers(
          email,
          name,
          subject,
          offerMessage,
          offerHTML,
        );
      } catch (err) {
        console.error(`Error sending email to ${email}:`, err);
      }
    }

    res.json({
      success: true,
      message: "Offer emails sent to all subscribers!",
    });
  } catch (error) {
    console.error("Error sending offers:", error);
    res.json({ success: false, message: "Error sending offer emails", error });
  }
};

export default sendOffers;
