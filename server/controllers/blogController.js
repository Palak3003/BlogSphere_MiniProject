const Blog = require("../models/Blog");


// 📝 CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    console.log("BACKEND RECEIVED:", req.body); // 🔥 check

    const { title, content, category } = req.body;

    const blog = await Blog.create({
      title: title,
      content: content,
      category: category, // ✅ THIS WAS MISSING / WRONG
      author: req.user.id,
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📖 GET ALL BLOGS
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 👤 GET MY BLOGS (PROFILE)
exports.getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ❤️ LIKE / UNLIKE
exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    const userId = req.user.id;

    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    res.json({
      msg: alreadyLiked ? "Unliked" : "Liked",
      totalLikes: blog.likes.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 💬 ADD COMMENT
exports.addComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    blog.comments.push({
      text: req.body.text,
      user: req.user.id,
    });

    await blog.save();

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};