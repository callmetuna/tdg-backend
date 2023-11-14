const express = require('express');
const router = express.Router();
const connection = require('../database'); // Import the MySQL database connection

// Import your controller functions for Brand
const {
  createBrand,
  getBrands,
  getBrandById,
  updateBrandById,
  deleteBrandById,
} = require('../controllers/BrandController');

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

// Middleware to validate the request body before creating or updating a brand
const validateBrand = (req, res, next) => {
  const { name, description } = req.body;

  // Validate the brand name
  const brandNameRegex = /^[a-zA-Z0-9\s-]{2,255}$/;
  if (!brandNameRegex.test(name)) {
    return res.status(400).json({
      message: 'The brand name must be between 2 and 255 characters long and can only contain letters, numbers, spaces, and hyphens.',
    });
  }

  // Validate the brand description
  const brandDescriptionRegex = /^[a-zA-Z0-9\s]{2,255}$/;
  if (!brandDescriptionRegex.test(description)) {
    return res.status(400).json({
      message: 'The brand description must be between 2 and 255 characters long and can only contain letters, numbers, and spaces.',
    });
  }

  // If the validation is successful, move on to the next handler in the chain
  next();
};

// Routes
router.post('/brands', logger, validateBrand, createBrand);
router.get('/brands', logger, getBrands);
router.get('/brands/:id', logger, getBrandById);
router.put('/brands/:id', logger, validateBrand, updateBrandById);
router.delete('/brands/:id', logger, deleteBrandById);

// Export the router so that it can be imported and used in other modules
module.exports = router;
