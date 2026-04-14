const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlogs,
  likeBlog,
  addComment,
  getMyBlogs,
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");


router.post("/", authMiddleware, createBlog);

router.get("/", getBlogs);

router.get("/myblogs", authMiddleware, getMyBlogs);

router.put("/like/:id", authMiddleware, likeBlog);

router.post("/comment/:id", authMiddleware, addComment);

module.exports = router;