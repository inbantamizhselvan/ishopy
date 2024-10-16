import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import orderModel from "../models/orderModel.js";
import otpModel from "../models/otpModel.js";
import { sendEmailToSubscribers } from "./sendEmailController.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
const loginUser = async (req, res) => {
  try {
    const { email, password, localIp } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist, Sign Up",
      });
    }
    const verified = user.verified;
    if (!verified) {
      return res.json({
        success: false,
        message: "You didn't verify your email",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const isExistingDevice = user.deviceIp.some((device) => device.ip === localIp);
      let deviceMessage = "You are logged in.";

      if (!isExistingDevice) {
        deviceMessage = "You are trying to log in from a new device, is this you?";

        await userModel.findOneAndUpdate(
          { email },
          { $addToSet: { deviceIp: localIp } } 
        );
      }

      const token = createToken(user._id);
      res.json({ success: true, token, message: deviceMessage });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "User Already exists, Try logging in.",
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const generateOTP = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };
    const otpSent = await otpModel.findOne({ email });
    if (!otpSent) {
      const otp = generateOTP();
      const subject = "Account Verification";
      const emailMessage = `Verify your IShopY account using this OTP <b>${otp}</b>.`;
      const emailHTML = ` <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <p style="font-size: 18px;">Hello ${name},</p>
          <p style="font-size: 16px;">${emailMessage}</p>
          <p style="font-size: 14px; color: #555;">The OTP is only valid for 5 minutes</p>
          <p>Thank You,<br><strong>IShopY Team</strong></p>
        </body>
      </html>`;
      await sendEmailToSubscribers({
        email,
        subject,
        emailMessage,
        emailHTML,
      });
      const tempStore = new otpModel({
        name,
        email,
        password: hashedPassword,
        otp,
      });
      await tempStore.save();
      return res.json({
        success: true,
        message: "Verify Your account using OTP sent to your email.",
      });
    } else {
      res.json({
        success: true,
        message: "OTP has been sent already. Kindly check your email once.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const isValid = await otpModel.findOne({ email });
    if (isValid.otp === Number(otp)) {
      const newUser = new userModel({
        name: isValid.name,
        email,
        password: isValid.password,
        verified: true,
      });
      await newUser.save();
      await otpModel.deleteOne({ email });
      res.json({
        success: true,
        message: "Your account is created successfully, you can login now!",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({
        success: false,
        message:
          "Invalid Credentials, Try entering the correct email and password",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const orders = await orderModel.find({ userId });
    const currentTime = new Date();
    if (!user.oneTimeToken || user.oneTimeTokenExpires < currentTime) {
      const oneTimeToken = createToken(userId);
      user.oneTimeToken = oneTimeToken;
      user.oneTimeTokenExpires = new Date(currentTime.getTime() + 15 * 60 * 1000);
      await user.save(); 
    }
    res.json({
      success: true,
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        joined: user.joined,
        cartData: user.cartData,
        oneTimeLoginToken: user.oneTimeToken,
      },
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const editUserProfile = async (req, res) => {
  try {
    const { userId, name, email, phone, address } = req.body;
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }
    const user = await userModel.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        phone,
        address,
      },
      { new: true }
    );

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const qrLogin = async (req, res) => {
  try {
    const { userId, token, localIp } = req.body;

    if (!userId || !token) {
      return res.json({ success: false, message: "Missing userId or token." });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    const isValidToken = jwt.verify(token, process.env.JWT_SECRET);
    if (isValidToken) {
      if (user.oneTimeToken === token) {
        const isExistingDevice = user.deviceIp.some((device) => device.ip === localIp);
        let deviceMessage = "You are logged in.";
        if (!isExistingDevice) {
          deviceMessage = "You are trying to log in from a new device, is this you?";
          await userModel.findOneAndUpdate(
            { email: user.email },
            { $addToSet: { deviceIp: localIp } }
          );
        }

        return res.json({
          success: true,
          token: createToken(user._id),
          message: deviceMessage,
        });
      } else {
        return res.json({ success: false, message: "QR Invalid, try again" });
      }
    } else {
      return res.json({ success: false, message: "Invalid token." });
    }
  } catch (error) {
    console.error("QR login error:", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  getUserProfile,
  loginUser,
  registerUser,
  adminLogin,
  editUserProfile,
  verifyOTP,
  qrLogin,
};
