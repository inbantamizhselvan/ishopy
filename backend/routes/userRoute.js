import express from "express";
import { loginUser, registerUser, adminLogin, getUserProfile, editUserProfile } from "../controllers/userController.js";
import authUser from "../middleware/auth.js";
import { subEmail } from "../controllers/subEmailController.js";
import adminAuth from "../middleware/adminAuth.js";
import sendOffers from "../controllers/sendOfferController.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/profile', authUser, getUserProfile);
userRouter.post('/subscribeEmail', authUser, subEmail);
userRouter.post('/sendoffers', adminAuth, sendOffers);
userRouter.post('/editProfile', authUser, editUserProfile);
export default userRouter;