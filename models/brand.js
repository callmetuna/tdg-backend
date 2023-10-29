const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    imageURL: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
  });

  return Brand;
};
