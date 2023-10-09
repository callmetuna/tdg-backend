const express = require('express');
const router = express.Router();
const BlogPostController = require('../controllers/BlogPostController');

// Validate the request body before creating a new blog post
const validateBlogPost = async (req, res, next) => {
  const { title, content, author, tags, image } = req.body;

  const errors = [];

  if (!title) {
    errors.push('Title is required');
  }

  if (!content) {
    errors.push('Content is required');
  }

  if (!author) {
    errors.push('Author is required');
  }

  if (!tags) {
    errors.push('Tags are required');
  }

  if (!image) {
    errors.push('Image is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// Create a new blog post
router.post('/blog-posts', validateBlogPost, async (req, res) => {
  const blogPost = await BlogPostController.createBlogPost(req.body);

  res.status(201).json(blogPost);
});

// Get all blog posts
router.get('/blog-posts', async (req, res) => {
  const blogPosts = await BlogPostController.getBlogPosts();

  res.send(blogPosts);
});

// Get a specific blog post by ID
router.get('/blog-posts/:id', async (req, res) => {
  const blogPost = await BlogPostController.getBlogPostById(req.params.id);

  if (!blogPost) {
    return res.status(404).json({ message: 'Blog post not found' });
  }

  res.send(blogPost);
});

// Update a blog post by ID
router.put('/blog-posts/:id', async (req, res) => {
  const updatedBlogPost = await BlogPostController.updateBlogPostById(req.params.id, req.body);

  res.status(200).json(updatedBlogPost);
});

// Delete a blog post by ID
router.delete('/blog-posts/:id', async (req, res) => {
  await BlogPostController.deleteBlogPostById(req.params.id);

  res.status(204).send();
});

module.exports = router;
