'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tokenEmail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      tokenEmail.belongsTo(models.user); //userId en tokenEmail
    }
  }
  tokenEmail.init({
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {  // Columna para la relación belongsTo, Genera userId en tokenEmails
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    commerceId: {  // Columna para la relación belongsTo, Genera commerceId en tokenEmail
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
    modelName: 'tokenEmail',
  });
  return tokenEmail;
};