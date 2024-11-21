'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class generalSetting extends Model {

    static associate(models) {

      generalSetting.belongsTo(models.commerce) // commerceId en generalSetting
    }
  }
  generalSetting.init({
    logo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mainServicePointName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mainServicePointPicture: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    standarServicePointName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    standarServicePointPicture: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    quantityStandarServicePoint: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    workDays: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    },
    workStart: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "00:00"
    },
    workEnd: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "23:59"
    },
    commerceId: { // Columna para la relación belongsTo, Genera commerceId en generalSetting
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
    modelName: 'generalSetting',
    timestamps: true,
    paranoid: true
  });
  return generalSetting;
};