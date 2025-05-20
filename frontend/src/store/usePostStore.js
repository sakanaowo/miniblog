import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const usePostStore = create((set, get) => ({
    feedPosts: [],
    isLoadingFeedPosts: true,

    currentPost: null,
    isLoadingCurrentPost: false,


    getFeedPosts: async () => {
        set({ isLoadingFeedPosts: true });
        try {
            const { data } = await axiosInstance.get("/posts/All");
            set({ feedPosts: data, isLoadingFeedPosts: false });
        } catch (error) {
            console.error("Error fetching feed posts:", error);
            set({ isLoadingFeedPosts: false });
            toast.error("Failed to load posts");
        } finally {
            set({ isLoadingFeedPosts: false });
        }
    },
    getPostBySlug: async (slug) => {
        set({ isLoadingCurrentPost: true })
        try {
            const res = await axiosInstance.get(`/posts/${slug}`);
            set({ currentPost: res.data[0], isLoadingCurrentPost: false });
            return res.data;
        }
        catch (error) {
            console.error("Error fetching post by slug:", error);
            toast.error("Failed to load post");
            return null;
        } finally {
            set({ isLoadingCurrentPost: false });
        }
    },
    createPost: async (data) => {
        try {
            const res = await axiosInstance.post("/posts/post", data);
            set((state) => ({
                feedPosts: [res.data, ...state.feedPosts],
            }));
            toast.success("Post created successfully");
            return res.data;
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error("Failed to create post");
            return null;
        }
    },

}));