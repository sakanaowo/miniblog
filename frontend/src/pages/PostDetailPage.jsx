import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostStore } from "../store/usePostStore";
import { Loader, MessageCircle } from "lucide-react";

const PostDetailPage = () => {
  const { slug } = useParams();
  const { currentPost, isLoadingCurrentPost, getPostBySlug } = usePostStore();

  useEffect(() => {
    getPostBySlug(slug);
  }, [slug, getPostBySlug]);
  console.log("currentPost", currentPost);

  if (isLoadingCurrentPost) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Post not found or deleted.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 min-h-screen pt-20">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md border">
        {currentPost.image && (
          <img
            src={currentPost.image}
            alt={currentPost.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
        )}

        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold">{currentPost.title}</h1>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            By {currentPost.author || "Unknown"} •{" "}
            {new Date(currentPost.createdAt).toLocaleDateString()}
          </div>

          <div className="text-base text-gray-800 dark:text-gray-200 whitespace-pre-line">
            {currentPost.content}
          </div>

          <div className="flex justify-end text-sm text-gray-500 dark:text-gray-400 mt-4">
            <MessageCircle className="w-4 h-4 mr-1" />0 Comments
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
