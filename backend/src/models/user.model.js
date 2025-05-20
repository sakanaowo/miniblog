import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        // deploy later 
        // avatar: {
        //     type: String,
        //     default: "https://www.svgrepo.com/show/452030/avatar-default.svg",
        // },
        // bio: {
        //     type: String,
        //     default: "",
        //     maxlength: 160,
        // },

    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
export default User;