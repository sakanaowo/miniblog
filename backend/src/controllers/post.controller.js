
import Post from '../models/post.model.js';

export const createPost = async (req, res) => {
    const { title, content, image } = req.body;
    const userId = req.user?._id || req.userId;
    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }


    try {
        let slug = title.toLowerCase().replace(/ /g, "-");
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
        slug += `-${timeString}`;
        const newPost = new Post({
            title,
            content,
            image,
            author: userId,
            slug,
        })
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.log("Create post error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.error("Get all posts error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getPostBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const post = await Post.find({ slug })
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error("Get post by slug error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}