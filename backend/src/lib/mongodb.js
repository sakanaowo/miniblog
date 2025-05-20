import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
    }
}