import express from "express";
import { createPost, getAllPosts, getPostBySlug } from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/post", protectRoute, createPost);

router.get("/All", getAllPosts);

router.get("/:slug", getPostBySlug);

export default router;