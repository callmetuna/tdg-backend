const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel').default; // Import your User model

// Route for user registration
router.post('/register', async (req, res) => {
  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      // Add other user fields as needed
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for user login and generating JWT
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate and send a JWT token to the client
    const token = user.generateToken(); // Use the generateToken method from your User model

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for requesting a password reset (forgot password)
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    try {
      // Check if the user exists with the provided email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a password reset token and send it to the user's email
      const resetToken = jwt.sign({ userId: user._id }, process.env.RESET_PASSWORD_SECRET, {
        expiresIn: '1h', // Token expiration time (adjust as needed)
      });
  
      // Send the reset token to the user's email (you may use a mailing library for this)
  
      res.status(200).json({ message: 'Password reset token sent to your email' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Route for resetting the password with a valid token
  router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    try {
      // Verify the reset token
      const decodedToken = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
  
      // Check if the user exists with the decoded user ID
      const user = await User.findById(decodedToken.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
  
      // Save the updated user with the new password
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Route to test authentication with a protected resource
router.get('/protected-resource', (req, res) => {
  // This route is protected, and only authenticated users with a valid JWT can access it
  res.status(200).json({ message: 'Protected resource accessed successfully' });
});

module.exports = router;
