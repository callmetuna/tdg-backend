const BlogPost = require('../models/blogPost');

// Create a new blog post
const createBlogPost = async (req, res) => {
  try {
    const newBlogPost = new BlogPost(req.body);
    await newBlogPost.save();
    res.status(201).send(newBlogPost);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all blog posts
const getBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.send(blogPosts);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a specific blog post by ID
const getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).send();
    }
    res.send(blogPost);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a blog post by ID
const updateBlogPostById = async (req, res) => {
  try {
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated blog post
    });
    if (!updatedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(updatedBlogPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a blog post by ID
const deleteBlogPostById = async (req, res) => {
  try {
    const deletedBlogPost = await BlogPost.findByIdAndRemove(req.params.id);
    if (!deletedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(204).send(); // No content (blog post deleted successfully)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBlogPost,
  getBlogPosts,
  getBlogPostById,
  updateBlogPostById,
  deleteBlogPostById,
};
