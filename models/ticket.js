const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    userId: {
      type: DataTypes.INTEGER, // Assuming userId is an integer type
    },
    eventId: {
      type: DataTypes.INTEGER, // Assuming eventId is an integer type
    },
    userToken: {
      type: DataTypes.STRING,
    },
  });

  // Define associations if necessary
  Ticket.associate = (models) => {
    Ticket.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Ticket.belongsTo(models.Event, {
      foreignKey: 'eventId',
    });
  };

  return Ticket;
};
