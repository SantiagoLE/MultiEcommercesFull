'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commerce extends Model {

    static associate(models) {

      commerce.belongsTo(models.typeOfCommerce); //typeOfComerceId en Commerce
      commerce.hasMany(models.product);
      commerce.hasMany(models.presentation);
      commerce.hasMany(models.promotion);
      commerce.hasMany(models.productPresentation);
      commerce.hasMany(models.user);
      commerce.hasMany(models.tokenEmail)
      commerce.hasOne(models.generalSetting);
    }
  }
  commerce.init({
    credentialName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    credentialPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    trialTime: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usesRemaining: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    payment: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'inactive'
    },
    typeOfCommerceId: { // Columna para la relación belongsTo, Genera typeOfComerceId en Commerce
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'typeOfCommerces',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
  }, {
    sequelize,
    modelName: 'commerce',
    timestamps: true,
    paranoid: true
  });
  return commerce;
};