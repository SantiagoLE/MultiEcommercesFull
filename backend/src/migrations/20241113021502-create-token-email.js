'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tokenEmails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.STRING,
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tokenEmails');
  }
};