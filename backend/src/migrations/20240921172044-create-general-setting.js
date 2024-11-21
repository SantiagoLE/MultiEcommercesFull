'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('generalSetting', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
        allowNull:false,
        references: {
          model: 'commerces', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
         onDelete: 'CASCADE' 
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: { 
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('generalSetting');
  }
};