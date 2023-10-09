const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const { readdirSync } = require('fs');
const { connectToDatabase } = require('./database'); // Adjust the path as needed
require('dotenv').config();

// Load routes dynamically
readdirSync('./routes').map((file) =>
  app.use('/', require('./routes/' + file))
);

// Connect to the database
(async () => {
  try {
    const db = await connectToDatabase();

    // Set the connected database object as an app-level variable
    app.set('db', db);

    // Other middleware and configuration settings go here

    // Use the userRouter for /user routes
    const userRouter = require('./routes/userRoutes');
    const brandRoutes = require('./routes/brandRoutes');
    app.use('/user', userRouter);
    app.use('/brand', brandRoutes);

    // Serve your index.html file
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    });

    /* configure body-parser */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error initializing the database:', error);
    process.exit(1); // Exit the application on database connection error
  }
})();
