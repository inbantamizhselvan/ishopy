import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import chatRouter from "./routes/chatRoute.js";

// APP CONFIG
const app = express();
const port = process.env.PORT || 4000;
connectDB().catch((error) => {
    console.error("Database connection failed:", error.message);
});
connectCloudinary();

const allowedOrigins = [
    "https://ishopy-frontend.vercel.app",
    "https://ishopy-frontend-inbantamizhselvans-projects.vercel.app",
    "https://ishopy-admin.vercel.app",
    "https://ishopy-admin-inbantamizhselvans-projects.vercel.app",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow non-browser clients with no Origin header.
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("CORS policy: This origin is not allowed"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token", "X-Requested-With"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ success: true, message: "API healthy" });
});

app.use('/api', async (req, res, next) => {
    try {
        await connectDB();
        return next();
    } catch (error) {
        return res.status(503).json({
            success: false,
            message: "Database unavailable. Please retry in a moment.",
        });
    }
});

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/chats', chatRouter);

app.get('/', (req, res) => {
    res.send("API Working");
});

if (!process.env.VERCEL) {
    app.listen(port, () => console.log('SERVER STARTED ON PORT : ' + port));
}

export default app;
