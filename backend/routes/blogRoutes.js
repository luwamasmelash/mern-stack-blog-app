import express from "express";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

import {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById,
  togglePublish,
  addComment,
  getBlogComments,
} from "../controllers/blogController.js";
import { generateContent } from "../controllers/blogController.js";

const blogRouter = express.Router();

// Add a new blog
blogRouter.post("/add", auth, upload.single("image"), addBlog);

// Get all blogs
blogRouter.get("/all", getAllBlogs);

// Delete a blog
blogRouter.post("/delete", auth, deleteBlogById);

// Toggle publish status
blogRouter.post("/toggle-publish", auth, togglePublish);

// Add a comment
blogRouter.post("/add-comment", auth, addComment);

// Get all comments
blogRouter.get("/comments", getBlogComments);

// IMPORTANT: Keep this route LAST so it doesn't match other routes like "/comments"
blogRouter.get("/:blogId", getBlogById);

blogRouter.post("/generate", auth, generateContent);

export default blogRouter;