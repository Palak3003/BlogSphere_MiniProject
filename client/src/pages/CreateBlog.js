import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Travel");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(`https://blogsphere-miniproject.onrender.com/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          category,
          image, // 🖼️ NEW
        }),
      });

      if (!res.ok) throw new Error("Failed");

      // 🚀 smooth redirect
      setTimeout(() => {
        navigate("/home");
      }, 500);

    } catch (error) {
      console.log(error);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell flex items-center justify-center px-4 py-10">
      <div className="glass-card w-full max-w-2xl p-6 sm:p-8">
        <h2 className="section-title text-center !text-2xl">Create a New Story</h2>
        <p className="section-subtitle text-center">
          Keep it short, meaningful, and visual.
        </p>

        <div className="mt-7 grid gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          className="soft-input"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="soft-input"
        >
          <option value="Travel">Travel</option>
          <option value="Family">Family</option>
          <option value="Friends">Friends</option>
          <option value="Health">Health</option>
          <option value="Life">Life</option>
        </select>

        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Paste Image URL (optional)"
          className="soft-input"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog..."
          className="soft-input min-h-40 resize-y"
        />

        <button
          onClick={handleCreate}
          disabled={loading}
          className={`primary-btn w-full ${
            loading ? "cursor-not-allowed opacity-60 hover:translate-y-0 hover:shadow-sm" : ""
          }`}
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
        </div>

      </div>
    </div>
  );
}

export default CreateBlog;