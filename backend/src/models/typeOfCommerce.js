'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class typeOfCommerce extends Model {

    static associate(models) {

      typeOfCommerce.hasMany(models.commerce)
    }
  }
  typeOfCommerce.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'typeOfCommerce',
    timestamps: true,
    paranoid: true
  });
  return typeOfCommerce;
};