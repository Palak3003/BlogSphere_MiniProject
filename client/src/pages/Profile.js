import { useEffect, useState } from "react";

function Profile() {
  const [blogs, setBlogs] = useState([]);
  const [expandedBlogs, setExpandedBlogs] = useState({});

  const fetchMyBlogs = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`https://blogsphere-miniproject.onrender.com/api/blogs/myblogs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const totalLikes = blogs.reduce((acc, b) => acc + (b.likes?.length || 0), 0);
  const totalComments = blogs.reduce((acc, b) => acc + (b.comments?.length || 0), 0);

  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm("Delete this post permanently?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://blogsphere-miniproject.onrender.com/api/blogs/${blogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.msg || "Failed to delete post");
        return;
      }

      setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.log(error);
      alert("Something went wrong while deleting");
    }
  };

  const toggleReadMore = (blogId) => {
    setExpandedBlogs((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  return (
    <div className="app-shell px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-xl font-semibold text-white">
            Y
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-800">Your Profile</h2>
            <p className="text-sm text-slate-500">Your writing dashboard in one place.</p>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="glass-card p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Total Blogs</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-800">{blogs.length}</h3>
          </div>
          <div className="glass-card p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Total Likes</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-800">{totalLikes}</h3>
          </div>
          <div className="glass-card p-4 col-span-2 md:col-span-1">
            <p className="text-xs uppercase tracking-wide text-slate-500">Total Comments</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-800">{totalComments}</h3>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-700">Your Blogs</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {blogs.map((blog) => (
              <article key={blog._id} className="glass-card p-5 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-lg bg-orange-50 px-2 py-1 text-xs text-orange-500">
                    {blog.category || "Life"}
                  </span>
                  <span className="text-xs text-slate-400">{blog.comments?.length || 0} comments</span>
                </div>
                <h4 className="font-semibold text-slate-800">{blog.title}</h4>
                <p className={`mt-2 text-sm text-slate-600 ${expandedBlogs[blog._id] ? "" : "line-clamp-3"}`}>
                  {blog.content}
                </p>
                {blog.content?.length > 180 && (
                  <button
                    onClick={() => toggleReadMore(blog._id)}
                    className="mt-2 w-fit text-xs font-semibold text-orange-500 transition hover:text-orange-600"
                  >
                    {expandedBlogs[blog._id] ? "Read less" : "Read more"}
                  </button>
                )}

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-slate-400">{blog.likes?.length || 0} likes</p>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="rounded-lg border border-rose-200 px-3 py-1 text-xs font-medium text-rose-500 transition hover:bg-rose-50"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>

          {blogs.length === 0 && (
            <div className="glass-card p-8 text-center text-sm text-slate-500">
              You have not created any blogs yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;