const Brand = require('../models/brand'); // Import the Brand model

const BrandController = {
  // Create a new brand
  createBrand: async (data) => {
    try {
      const brand = new Brand(data);
      await brand.save();
      return brand;
    } catch (error) {
      throw error;
    }
  },

  // Get all brands
  getBrands: async () => {
    try {
      const brands = await Brand.find();
      return brands;
    } catch (error) {
      throw error;
    }
  },

  // Get a specific brand by ID
  getBrandById: async (id) => {
    try {
      const brand = await Brand.findById(id);
      return brand;
    } catch (error) {
      throw error;
    }
  },

  // Update a brand by ID
  updateBrandById: async (id, data) => {
    try {
      const updatedBrand = await Brand.findByIdAndUpdate(id, data, {
        new: true, // Return the updated brand
      });
      return updatedBrand;
    } catch (error) {
      throw error;
    }
  },

  // Delete a brand by ID
  deleteBrandById: async (id) => {
    try {
      await Brand.findByIdAndRemove(id);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = BrandController;
