import mongoose from "mongoose";

let isConnected = false;
mongoose.set("bufferCommands", false);

const connectDB = async () => {
    if (isConnected) {
        return;
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        throw new Error("MONGODB_URI is not set");
    }

    if (!mongoose.connection.listeners("connected").length) {
        mongoose.connection.on("connected", () => {
            console.log("DB Connected");
        });
    }

    await mongoose.connect(`${mongoUri}/e-commerce`, {
        serverSelectionTimeoutMS: 8000,
        socketTimeoutMS: 20000,
    });

    isConnected = true;
}

export default connectDB;