'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class promotion extends Model {

    static associate(models) {

      promotion.belongsTo(models.commerce) // commerceId en promotions
      promotion.belongsToMany(models.product, { through: 'productPromotions' }); // relacion promotion con product, a traves de la tabla productPromotions 
    }
  }
  promotion.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    limitOfProducts: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fixedAssociation: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    commerceId: { // Columna para la relación belongsTo, Genera commerceId en promotions
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
    modelName: 'promotion',
    timestamps: true,
    paranoid: true
  });
  return promotion;
};