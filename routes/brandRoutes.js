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
const brandNameRegex = /^[a-zA-Z0-9\-\s]+/;
if (!brandNameRegex.test(name)) {
res.status(400).json({
message: 'The brand name must be between 2 and 255 characters long and can only contain letters, numbers, spaces, and hyphens.',
});
return;
}

// Validate the brand description
const brandDescriptionRegex = /^[a-zA-Z0-9\s]+$/;
if (!brandDescriptionRegex.test(description)) {
res.status(400).json({
message: 'The brand description must be between 2 and 255 characters long and can only contain letters, numbers, and spaces.',
});
return;
}

// If the validation is successful, move on to the next handler in the chain
next();
};

// Route to create a new brand
router.post('/brands', logger, validateBrand, createBrand);

// Route to get all brands
router.get('/brands', logger, getBrands);

// Route to get a specific brand by ID
router.get('/brands/:id', logger, getBrandById);

// Route to update a specific brand by ID
router.put('/brands/:id', logger, validateBrand, updateBrandById);

// Route to delete a specific brand by ID
router.delete('/brands/:id', logger, deleteBrandById);

// Export the router so that it can be imported and used in other modules
module.exports = router;