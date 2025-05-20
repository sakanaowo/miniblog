import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            default: "",
        },
        image: {
            type: String,
        },
        // deploy later
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        // isPublished: {
        //     type: Boolean,
        //     default: false,
        // },
    },
    {
        timestamps: true,
    }
)

const Post = mongoose.model("Post", postSchema);
export default Post;