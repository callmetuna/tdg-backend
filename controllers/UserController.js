// controllers/userController.js
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Winston = require('winston');
const User = require('../models/userModel');

const logger = Winston.createLogger({
  transports: [
    new Winston.transports.Console(),
    new Winston.transports.File({ filename: 'error.log', level: 'error' }),
    new Winston.transports.File({ filename: 'combined.log' }),
  ],
});

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

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send(newUser);
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

    const users = await User.find()
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.send(users);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Get a specific user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Update a user by ID
const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(updatedUser);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (!deletedUser) {
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
