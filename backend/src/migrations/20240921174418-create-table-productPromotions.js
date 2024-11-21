'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('productPromotions', {
      productId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
          model: 'products', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      },
      promotionId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
          model: 'promotions', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE, 
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('productPromotions');
  }
};
