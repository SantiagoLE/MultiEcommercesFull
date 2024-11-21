'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('promotions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
        type: DataTypes.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('promotions');
  }
};