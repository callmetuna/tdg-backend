const db = require('../models'); // Import your Sequelize models

const BrandController = {
  // Create a new brand
  createBrand: async (data) => {
    try {
      const brand = await db.Brand.create(data);
      return brand;
    } catch (error) {
      throw error;
    }
  },

  // Get all brands
  getBrands: async () => {
    try {
      const brands = await db.Brand.findAll();
      return brands;
    } catch (error) {
      throw error;
    }
  },

  // Get a specific brand by ID
  getBrandById: async (id) => {
    try {
      const brand = await db.Brand.findByPk(id);
      return brand;
    } catch (error) {
      throw error;
    }
  },

  // Update a brand by ID
  updateBrandById: async (id, data) => {
    try {
      const [updatedRows] = await db.Brand.update(data, {
        where: { id: id },
        returning: true,
      });

      if (updatedRows === 0) {
        throw new Error('Brand not found');
      }

      const updatedBrand = updatedRows[1][0]; // Get the updated brand

      return updatedBrand;
    } catch (error) {
      throw error;
    }
  },

  // Delete a brand by ID
  deleteBrandById: async (id) => {
    try {
      const deletedRows = await db.Brand.destroy({ where: { id: id } });

      if (deletedRows === 0) {
        throw new Error('Brand not found');
      }
    } catch (error) {
      throw error;
    }
  },
};

module.exports = BrandController;
