'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('commerces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
    await queryInterface.dropTable('commerces');
  }
};