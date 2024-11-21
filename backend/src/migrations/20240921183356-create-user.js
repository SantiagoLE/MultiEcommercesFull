'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
    }).then(() => {
      // Añadir el índice único compuesto después de crear la tabla
      return queryInterface.addIndex(
        'users',
        ['userName', 'commerceId'],
        {
          unique: true,
          name: 'unique_username_commerce'
        }
      );
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('users', 'unique_username_commerce');
    await queryInterface.dropTable('users');
  }
};