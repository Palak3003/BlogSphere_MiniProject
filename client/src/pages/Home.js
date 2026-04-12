import { useEffect, useState } from "react";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentBackground, setCurrentBackground] = useState(null);
  const [previousBackground, setPreviousBackground] = useState(null);
  const [animatingLikes, setAnimatingLikes] = useState({});
  const [expandedBlogs, setExpandedBlogs] = useState({});

  const categories = ["All", "Travel", "Family", "Friends", "Health", "Life"];
  const categoryBackgrounds = {
    All:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=2200&q=80",
    Travel:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80",
    Family:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=2000&q=80",
    Friends:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=80",
    Health:
      "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?auto=format&fit=crop&w=2000&q=80",
    Life:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=2000&q=80",
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const trendingBlogs = [...blogs]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 3);

  const getEmoji = (category) => {
    switch (category) {
      case "Travel":
        return "✈";
      case "Family":
        return "🏡";
      case "Friends":
        return "🤝";
      case "Health":
        return "💪";
      case "Life":
        return "🌿";
      default:
        return "📝";
    }
  };

  const getCurrentUserId = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id || payload.userId || payload._id || null;
    } catch (error) {
      return null;
    }
  };

  const isLikedByCurrentUser = (likes) => {
    const userId = getCurrentUserId();
    if (!userId || !Array.isArray(likes)) return false;

    return likes.some((entry) => {
      if (!entry) return false;
      if (typeof entry === "string") return entry === userId;
      if (typeof entry === "object") {
        return (
          entry === userId ||
          entry._id === userId ||
          entry.user === userId ||
          entry.userId === userId
        );
      }
      return false;
    });
  };

  const triggerLikeAnimation = (blogId) => {
    setAnimatingLikes((prev) => ({ ...prev, [blogId]: true }));
    setTimeout(() => {
      setAnimatingLikes((prev) => ({ ...prev, [blogId]: false }));
    }, 450);
  };

  const handleDeleteBlog = async (blogId) => {
    const confirmDelete = window.confirm("Delete this post permanently?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/blogs/${blogId}`, {
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

  const filteredBlogs = blogs.filter((blog) => {
    const text = search.toLowerCase();
    const matchSearch =
      blog.title.toLowerCase().includes(text) ||
      blog.content.toLowerCase().includes(text);

    const matchCategory =
      activeCategory === "All" || blog.category === activeCategory;

    return matchSearch && matchCategory;
  });

  const activeBackground = categoryBackgrounds[activeCategory];

  useEffect(() => {
    if (activeBackground === currentBackground) return;

    setPreviousBackground(currentBackground);
    setCurrentBackground(activeBackground || null);

    const timeout = setTimeout(() => {
      setPreviousBackground(null);
    }, 700);

    return () => clearTimeout(timeout);
  }, [activeBackground, currentBackground]);

  return (
    <div className="app-shell relative overflow-hidden px-4 py-8 sm:px-6">
      {(currentBackground || previousBackground) && (
        <>
          {previousBackground && (
            <div
              className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-50 animate-bg-fade-out"
              style={{ backgroundImage: `url(${previousBackground})` }}
            />
          )}
          {currentBackground && (
            <div
              key={currentBackground}
              className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-0 animate-bg-fade-in"
              style={{ backgroundImage: `url(${currentBackground})` }}
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-white/45" />
        </>
      )}

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="mb-8 text-center">
          <h1 className="section-title">Explore Stories</h1>
          <p className="section-subtitle">Discover ideas in a soft, distraction-free layout</p>
        </div>

        <div className="glass-card mx-auto mb-8 w-full max-w-xl p-3 sm:p-4">
          <input
            placeholder="Search by title or content"
            className="soft-input"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-orange-400 text-white shadow-sm"
                  : "border border-orange-200 bg-white text-slate-600 hover:bg-orange-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <h2 className="mb-4 text-xl font-semibold text-slate-700">Trending</h2>
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trendingBlogs.map((blog) => (
            <div key={blog._id} className="glass-card p-5 hover:-translate-y-1">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-lg bg-orange-50 px-2 py-1 text-sm text-orange-500">
                  {blog.category}
                </span>
                <span className="text-2xl">{getEmoji(blog.category)}</span>
              </div>
              <h3 className="line-clamp-1 text-lg font-semibold text-slate-800">{blog.title}</h3>
              <p className="mt-1 text-sm text-slate-500">By {blog.author?.name || "User"}</p>
              <div className="mt-4 flex items-center justify-between">
                {(() => {
                  const likedByMe = isLikedByCurrentUser(blog.likes);
                  const isAnimating = Boolean(animatingLikes[blog._id]);

                  return (
                    <button
                      onClick={async () => {
                        try {
                          triggerLikeAnimation(blog._id);
                          const token = localStorage.getItem("token");
                          await fetch(`http://localhost:8000/api/blogs/like/${blog._id}`, {
                            method: "PUT",
                            headers: { Authorization: `Bearer ${token}` },
                          });
                          fetchBlogs();
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                      className="relative inline-flex items-center gap-2 rounded-full bg-orange-400 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-500"
                    >
                      <span
                        className={`${
                          likedByMe ? "text-red-500" : "text-white"
                        } ${isAnimating ? "animate-like-pop" : ""} leading-none`}
                      >
                        ❤
                      </span>
                      {isAnimating && (
                        <span className="absolute inset-0 animate-like-ring rounded-full border-2 border-red-300" />
                      )}
                      <span>{blog.likes?.length || 0}</span>
                    </button>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <article
              key={blog._id}
              className="glass-card flex h-full flex-col p-5 hover:-translate-y-1 hover:shadow-md"
            >
              {(() => {
                const currentUserId = getCurrentUserId();
                const authorId =
                  typeof blog.author === "string" ? blog.author : blog.author?._id;
                const isMyPost = Boolean(currentUserId && authorId && authorId === currentUserId);

                return (
              <div className="mb-4 flex items-start justify-between">
                <span className="rounded-lg bg-orange-50 px-3 py-1 text-xs font-medium text-orange-500">
                  {blog.category}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getEmoji(blog.category)}</span>
                  {isMyPost && (
                    <button
                      onClick={() => handleDeleteBlog(blog._id)}
                      className="rounded-lg border border-rose-200 px-2 py-1 text-xs font-medium text-rose-500 transition hover:bg-rose-50"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
                );
              })()}

              <h3 className="text-lg font-semibold text-slate-800">{blog.title}</h3>
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
              <p className="mt-2 text-xs text-slate-400">By {blog.author?.name || "User"}</p>

              <div className="mt-4 flex items-center justify-between">
                {(() => {
                  const likedByMe = isLikedByCurrentUser(blog.likes);
                  const isAnimating = Boolean(animatingLikes[blog._id]);

                  return (
                <button
                  onClick={async () => {
                    try {
                      triggerLikeAnimation(blog._id);
                      const token = localStorage.getItem("token");
                      await fetch(`http://localhost:8000/api/blogs/like/${blog._id}`, {
                        method: "PUT",
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      fetchBlogs();
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  className="relative inline-flex items-center gap-2 rounded-full bg-orange-400 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-500"
                >
                  <span
                    className={`${
                      likedByMe ? "text-red-500" : "text-white"
                    } ${isAnimating ? "animate-like-pop" : ""} leading-none`}
                  >
                    ❤
                  </span>
                  {isAnimating && <span className="absolute inset-0 animate-like-ring rounded-full border-2 border-red-300" />}
                  <span>{blog.likes?.length || 0}</span>
                </button>
                  );
                })()}
              </div>

              <input
                placeholder="Write a comment and press Enter"
                className="soft-input mt-4 !rounded-full !py-2"
                onKeyDown={async (e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    try {
                      const token = localStorage.getItem("token");
                      await fetch(`http://localhost:8000/api/blogs/comment/${blog._id}`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ text: e.target.value }),
                      });
                      e.target.value = "";
                      fetchBlogs();
                    } catch (error) {
                      console.log(error);
                    }
                  }
                }}
              />

              <div className="mt-3 space-y-2 overflow-y-auto pr-1">
                {blog.comments?.slice(-3).map((c, i) => (
                  <p key={i} className="rounded-lg bg-orange-50 px-3 py-2 text-xs text-slate-600">
                    {c.text}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="glass-card mx-auto mt-10 max-w-xl p-8 text-center text-slate-500">
            No blogs match your current search and category filter.
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;