const { MongoClient } = require('mongodb');
require('dotenv').config(); // Load environment variables from .env file

// MongoDB connection URL constructed using environment variables
const mongoURI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// Create a MongoDB client
const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to the MongoDB server
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(); // Return the connected database object
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

// Export the connectToDatabase function
module.exports = { connectToDatabase };
