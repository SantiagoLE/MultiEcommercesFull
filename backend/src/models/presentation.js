'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class presentation extends Model {
   
    static associate(models) {
      
      presentation.belongsTo(models.commerce); // commerceId en presentations
      presentation.belongsToMany(models.product, { through: models.productPresentation }); // relacion de presentation con product, a traves del modelo productPresentation      
    }
  }
  presentation.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commerceId: {  
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'commerces',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'presentation',
    timestamps: true,
    paranoid: true
  });
  return presentation;
};