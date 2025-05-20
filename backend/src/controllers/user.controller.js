import User from '../models/user.model.js';
// import bcrypt from 'bcrypt'; 
import { generateToken } from '../lib/utils.js';

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne(
            { email }
        )
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        console.log("User logged in: ", user);


        res.status(200).json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        )
    } catch (error) {
        console.log("Login error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({
            name,
            email,
            password,
        })

        await newUser.save();
        res.status(201).json(
            {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        )
    } catch (error) {
        console.log("Signup error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Logout error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Check auth error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}