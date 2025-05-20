import { useEffect } from "react";
import { usePostStore } from "../store/usePostStore";
import PostCard from "../components/PostCard";
import { Loader } from "lucide-react";

const HomePage = () => {
  const { feedPosts, getFeedPosts, isLoadingFeedPosts } = usePostStore();

  useEffect(() => {
    getFeedPosts();
  }, [getFeedPosts]);

  return (
    <main className="container mx-auto px-4 py-8 min-h-screen pt-20">
      <h1 className="text-3xl font-bold mb-6"></h1>

      {isLoadingFeedPosts ? (
        <div className="flex justify-center items-center h-40">
          <Loader className="w-6 h-6 animate-spin" />
        </div>
      ) : feedPosts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePage;
