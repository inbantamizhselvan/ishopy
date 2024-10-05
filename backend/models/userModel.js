import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    phone: {type: Number},
    address: {type:Object},
    joined: {type: Date, default: Date.now},
    verified: {type:Boolean, default:false},
    cartData: {type:Object, default: {}},
}, {minimize:false});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;