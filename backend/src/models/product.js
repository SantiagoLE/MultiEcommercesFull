'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {

    static associate(models) {

      product.belongsTo(models.commerce); // commerceId en products
      product.belongsToMany(models.presentation, { through: models.productPresentation }); // relacion product con presentation, a traves del modelo productPresentation      
      product.belongsToMany(models.promotion, { through: 'productPromotions' }); // relacion product con promotion, a traves de la tabla productPromotions      
    }
  }
  product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    commerceId: { // Columna para la relación belongsTo, Genera commerceId en products
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'commerces',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'product',
    timestamps: true,
    paranoid: true
  });
  return product;
};