const express = require('express');
const router = express.Router();
const { authenticationVerifier, isAdminVerifier, accessLevelVerifier } = require('../middleware/verifyToken');
const UserController = require('../controllers/UserController');
const { check, validationResult } = require('express-validator');

// Validate the request body before saving a new user
const validateUser = [
  check('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .matches(/^[a-zA-Z0-9_]+$/, 'i')
    .withMessage('Username can only contain letters, numbers, and underscores'),
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Create a new user (requires authentication)
router.post('/users', validateUser, authenticationVerifier, async (req, res) => {
  const user = await UserController.createUser(req.body);

  res.status(201).json(user);
});

// Get all users (requires authentication)
router.get('/users', authenticationVerifier, async (req, res) => {
  const users = await UserController.getUsers();

  res.send(users);
});

// Get a specific user by ID (requires authentication and access level check)
router.get('/users/:id', authenticationVerifier, accessLevelVerifier, async (req, res) => {
  const user = await UserController.getUserById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.send(user);
});

// Update a user by ID (requires authentication and access level check)
router.put('/users/:id', validateUser, authenticationVerifier, accessLevelVerifier, async (req, res) => {
  const updatedUser = await UserController.updateUserById(req.params.id, req.body);

  res.status(200).json(updatedUser);
});

// Delete a user by ID (requires authentication and admin access)
router.delete('/users/:id', authenticationVerifier, isAdminVerifier, async (req, res) => {
  await UserController.deleteUserById(req.params.id);

  res.status(204).send();
});

module.exports = router;
