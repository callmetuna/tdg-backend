const db  = require('../models/brand'); 
const Brand = db.Brand;

// Create a new brand
const createBrand = async (req, res) => {
  try {
    const { name, link, description, imageURL, author, title } = req.body;
    const newBrand = await Brand.create({
      name,
      link,
      description,
      imageURL,
      author,
      title,
    });
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all brands 
const getBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific brand by ID
const getBrandById = async (req, res) => {
  try {
    const brandId = req.params.id;
    const brand = await Brand.findByPk(brandId);

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a brand by ID
const updateBrandById = async (req, res) => {
  try {
    const brandId = req.params.id;
    const { name, link, description, imageURL, author, title } = req.body;

    const [updatedRows] = await Brand.update(
      {
        name,
        link,
        description,
        imageURL,
        author,
        title,
      },
      {
        where: { id: brandId },
        returning: true,
      }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    const updatedBrand = updatedRows[1][0]; // Get the updated brand

    res.json(updatedBrand);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a brand by ID
const deleteBrandById = async (req, res) => {
  try {
    const brandId = req.params.id;
    const deletedRows = await Brand.destroy({ where: { id: brandId } });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.status(204).send(); // No content (brand deleted successfully)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBrand,
  getBrands,
  getBrandById,
  updateBrandById,
  deleteBrandById,
};
