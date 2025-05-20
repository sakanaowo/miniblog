import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connectDB } from './lib/mongodb.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));

app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)

app.get("/", (req, res) => {
    res.send("alo alo ");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Connecting to MongoDB...');
    connectDB();
});