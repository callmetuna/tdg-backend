const mysql = require('mysql');

module.exports = function (app) {
  // Create a connection to the MySQL database
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tdg-app',
  });

  // Connect to the MySQL server
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the MySQL database');
  });

  // Set the connected database object as an app-level variable
  app.set('db', connection);

  // Return the 'connection' object so that it can be used elsewhere if needed
  return connection;

  
};
