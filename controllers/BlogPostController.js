const db = require('../models/blogpost'); 

const BlogPostController = {
  // Create a new blog post
  createBlogPost: async (data) => {
    try {
      const blogPost = await db.BlogPost.create(data);
      return blogPost;
    } catch (error) {
      throw error;
    }
  },

  // Get all blog posts
  getBlogPosts: async () => {
    try {
      const blogPosts = await db.BlogPost.findAll();
      return blogPosts;
    } catch (error) {
      throw error;
    }
  },

  // Get a specific blog post by ID
  getBlogPostById: async (id) => {
    try {
      const blogPost = await db.BlogPost.findByPk(id);
      return blogPost;
    } catch (error) {
      throw error;
    }
  },

  // Update a blog post by ID
  updateBlogPostById: async (id, data) => {
    try {
      const [updatedRows] = await db.BlogPost.update(data, {
        where: { id: id },
        returning: true,
      });

      if (updatedRows === 0) {
        throw new Error('Blog post not found');
      }

      const updatedBlogPost = updatedRows[1][0]; // Get the updated blog post

      return updatedBlogPost;
    } catch (error) {
      throw error;
    }
  },

  // Delete a blog post by ID
  deleteBlogPostById: async (id) => {
    try {
      const deletedRows = await db.BlogPost.destroy({ where: { id: id } });

      if (deletedRows === 0) {
        throw new Error('Blog post not found');
      }
    } catch (error) {
      throw error;
    }
  },
};

module.exports = BlogPostController;
