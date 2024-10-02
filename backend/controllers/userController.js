import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import orderModel from "../models/orderModel.js";


// create token
const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// User Login Route
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success:false, message:"User does not exists, Sign Up"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            res.json({success:true, token});
        }
        else{
            res.json({success:false, message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }

}

// User Reg Route
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        // checking user already signed up with the email
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false, message:"User Already exists"})
        }
        // Validating email and password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"})
        }
        if (password.length < 8) {
            return res.json({success:false, message:"Please enter a strong password"})
        }
        //Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        })
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true, token})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//Admin Login Route
const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success:true, token})
        }
        else{
            res.json({success:false, message:"Invalid Credentials, Try entering the correct email and password"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message});
    }
}

const getUserProfile = async (req, res) => {
    try {
        const {userId} = req.body;  
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({success: false, message: "User not found"});
        }
        const orders = await orderModel.find({userId});
        res.json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                joined:user.joined,
                cartData: user.cartData,
            },
            orders
        });
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
};

const editUserProfile = async (req, res) => {
    try {
        const { userId, name, email, phone, address } = req.body;
        
        // Validate the email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format" });
        }

        // Find user by ID and update details
        const user = await userModel.findByIdAndUpdate(userId, {
            name,
            email,
            phone,
            address,
        }, { new: true });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "Profile updated successfully", user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export {getUserProfile, loginUser, registerUser, adminLogin, editUserProfile};