import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostStore } from "../store/usePostStore";
import { toast } from "react-hot-toast";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const { createPost } = usePostStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Title and content are required");
      return;
    }

    setLoading(true);
    const result = await createPost({ title, content, image });
    setLoading(false);

    if (result) {
      navigate(`/post/${result.slug}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 min-h-screen">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg border">
        <h1 className="text-2xl font-semibold mb-4">Create a Post</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter a descriptive title"
              className="w-full input input-bordered"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={150}
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              placeholder="What's on your mind?"
              className="w-full textarea textarea-bordered min-h-[120px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Image (optional)
            </label>
            <input
              type="url"
              placeholder="Paste image URL"
              className="w-full input input-bordered"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          {/* Preview */}
          {image && (
            <img
              src={image}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border"
            />
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
