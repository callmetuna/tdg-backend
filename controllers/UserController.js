const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/user');
const logger = require('winston'); 

// Create a new user
const createUser = async (req, res) => {
  try {
    // Validate user input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user using Sequelize model
    const newUser = await db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Get all users with pagination
const getUsers = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 10;

    // Retrieve users using Sequelize model
    const users = await db.User.findAll({
      offset: (page - 1) * perPage,
      limit: perPage,
    });

    res.json(users);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Get a specific user by ID
const getUserById = async (req, res) => {
  try {
    // Find a user by ID using Sequelize model
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Update a user by ID
const updateUserById = async (req, res) => {
  try {
    // Update user using Sequelize model
    const [updatedRows] = await db.User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (updatedRows === 0) {
      return res.status(404).send('User not found');
    }

    const updatedUser = updatedRows[1][0]; // Get the updated user

    res.status(200).json(updatedUser);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    // Delete user using Sequelize model
    const deletedUser = await db.User.destroy({ where: { id: req.params.id } });
    if (deletedUser === 0) {
      return res.status(404).send('User not found');
    }

    res.status(204).send();
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
