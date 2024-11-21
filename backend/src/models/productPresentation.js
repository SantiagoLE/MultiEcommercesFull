'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productPresentation extends Model {

    static associate(models) {

      productPresentation.belongsTo(models.commerce) // commerceId en productPresentations
      productPresentation.belongsTo(models.product); // productId en productPresentations
      productPresentation.belongsTo(models.presentation); // presentationId en productPresentations
    }
  }
  productPresentation.init({
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "-",
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    commerceId: {  // Columna para la relación belongsTo, Genera commerceId en productPresentations
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'commerces',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    productId: { // Columna para la relación belongsTo, Genera productId en productPresentations
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products', // Nombre de la tabla de Product
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    presentationId: { // Columna para la relación belongsTo, Genera presentationId en productPresentations
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'presentations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'productPresentation',
    timestamps: true,
    paranoid: true
  });
  return productPresentation;
};