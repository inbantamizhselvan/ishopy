import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {type:String, required:true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    otp: {type:Number},
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300,
    },
});

const otpModel = mongoose.models.otp || mongoose.model('otp', otpSchema);

export default otpModel;