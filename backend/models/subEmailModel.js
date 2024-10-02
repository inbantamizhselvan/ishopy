import mongoose from "mongoose";

const subEmailSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
});

const subEmailModel = mongoose.models.subEmail || mongoose.model('subEmail', subEmailSchema);

export default subEmailModel;