'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {

    static associate(models) {

      user.belongsTo(models.commerce) // commerceId en users
      user.hasOne(models.tokenEmail)  // Relacion uno a uno con tokenEmail
    }
  }
  user.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileImage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
    },
    restrictedTime: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    commerceId: {  // Columna para la relación belongsTo, Genera commerceId en users
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
    modelName: 'user',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ['userName', 'commerceId'],
      }
    ]
  });
  return user;
};