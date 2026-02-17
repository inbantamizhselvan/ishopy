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
connectDB();
connectCloudinary();

// --- FIXED CORS CONFIGURATION ---
const allowedOrigins = [
    'https://ishopy-frontend.vercel.app', // Your production frontend
    'http://localhost:5173'               // Your local development
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('CORS policy: This origin is not allowed'), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle the manual preflight (OPTIONS) request
// This is critical for Vercel deployments!
app.options('*', cors()); 
// ---------------------------------

app.use(express.json());

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/chats', chatRouter);

app.get('/', (req, res) => {
    res.send("API Working");
});

app.listen(port, () => console.log('SERVER STARTED ON PORT : ' + port));
