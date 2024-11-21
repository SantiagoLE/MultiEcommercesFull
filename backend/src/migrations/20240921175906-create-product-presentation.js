'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productPresentations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "-"
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
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
    await queryInterface.dropTable('productPresentations');
  }
};
