const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String },
  description: { type: String },
  imageURL: { type: String },
  author: { type: String },
  title: { type: String },
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
