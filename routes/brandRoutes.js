const express = require('express');
const router = express.Router();
const BrandController = require('../controllers/BrandController').default;
const Brand = require('../models/brand');

// Middleware to log all incoming requests
const logger = (req, res, next) => {
  const { method, url } = req;
  console.log(`${method} ${url}`);
  next();
};

// Middleware to handle errors
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Something went wrong. Please try again later.',
  });
};

// Validate the request body before creating a new brand
const validateBrand = (req, res, next) => {
  const { name, link, description, imageURL, author, title } = req.body;
  const errors = [];

  if (!name) {
    errors.push('Name is required');
  }

  if (!link) {
    errors.push('Link is required');
  } else {
    // Validate 'link' using a regex pattern (URL pattern)
    const linkPattern = /^(https?:\/\/)?(www\.)?[\w-]+\.[a-z]{2,}/i;
    if (!link.match(linkPattern)) {
      errors.push('Link must be a valid URL');
    }
  }

  if (!description) {
    errors.push('Description is required');
  }

  if (!imageURL) {
    errors.push('ImageURL is required');
  } else {
    // Validate 'imageURL' using a regex pattern (URL pattern)
    const imageURLPattern = /^(https?:\/\/)?(www\.)?[\w-]+\.[a-z]{2,}/i;
    if (!imageURL.match(imageURLPattern)) {
      errors.push('ImageURL must be a valid URL');
    }
  }

  if (!author) {
    errors.push('Author is required');
  } else {
    // Validate 'author' using a regex pattern (Alphabetic characters only)
    const authorPattern = /^[A-Za-z\s]+$/;
    if (!author.match(authorPattern)) {
      errors.push('Author must contain only alphabetic characters');
    }
  }

  if (!title) {
    errors.push('Title is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// Create a new brand
router.post('/brands', logger, validateBrand, async (req, res, next) => {
  try {
    const brand = await BrandController.createBrand(req.body);
    res.status(201).json(brand);
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
});

// Get all brands
router.get('/brands', logger, async (req, res, next) => {
  try {
    const brands = await Brand.find(); // Use Mongoose to find all brands
    res.json(brands);
  } catch (error) {
    next(error);
  }
});

// Get a specific brand by ID
router.get('/brands/:id', logger, async (req, res, next) => {
  try {
    const brand = await BrandController.getBrandById(req.params.id);

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.json(brand);
  } catch (error) {
    next(error);
  }
});

// Update a brand by ID
router.put('/brands/:id', logger, validateBrand, async (req, res, next) => {
  try {
    const updatedBrand = await BrandController.updateBrandById(req.params.id, req.body);
    res.json(updatedBrand);
  } catch (error) {
    next(error);
  }
});

// Delete a brand by ID
router.delete('/brands/:id', logger, async (req, res, next) => {
  try {
    await BrandController.deleteBrandById(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Add the error handler middleware to the router
router.use(errorHandler);

module.exports = router;
