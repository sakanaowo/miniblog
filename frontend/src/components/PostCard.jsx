import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const PostCard = ({ post }) => {
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition bg-white dark:bg-neutral-900">
      {/* Hình ảnh nếu có */}
      {post.image && (
        <Link to={`/post/${post.slug}`}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-52 object-cover rounded-t-lg"
          />
        </Link>
      )}

      {/* Nội dung */}
      <div className="p-4 space-y-2">
        {/* Tiêu đề */}
        <Link to={`/post/${post.slug}`}>
          <h2 className="text-xl font-semibold hover:text-primary transition line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Nội dung rút gọn */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {post.content}
        </p>

        {/* Thông tin tác giả và thời gian */}
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
          <span>
            By {post.author || "Unknown"} •{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {/* Nếu có comment count bạn có thể dùng: post.comments.length */}0
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
