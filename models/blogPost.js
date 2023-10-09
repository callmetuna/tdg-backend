const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }], // An array of strings for tags
  image: { 
    data: Buffer, // Binary image data
    contentType: String, // MIME type of the image
  },
  createdAt: { type: Date, default: Date.now }, // Timestamp when the blog post was created
  updatedAt: { type: Date }, // Timestamp when the blog post was last updated
  authorToken: { type: String }, // JWT token for author's authentication and authorization
});

// Automatically update 'updatedAt' field when a blog post is modified
blogPostSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
