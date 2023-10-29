const db = require('../models'); // Import your Sequelize models
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const apiConfig = require("../config/api");

const UserController = {
  // Create a new user
  createUser: async (data) => {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await db.User.create({ ...data, password: hashedPassword });
      return user;
    } catch (error) {
      throw error;
    }
  },

  // Login an existing user
  loginUser: async (username, password) => {
    try {
      const user = await db.User.findOne({ where: { username: username } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('User not exists or invalid credentials');
      }

      const accessToken = jwt.sign(
        {
          id: user.id,
          isAdmin: user.isAdmin,
        },
        apiConfig.jwtSecret,
        { expiresIn: '1d' }
      );

      const { password: _, ...data } = user.toJSON(); // Exclude password from the response

      return {
        type: 'success',
        message: 'Successfully logged in',
        ...data,
        accessToken,
      };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = UserController;
