'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('superUsers', [
      {
        userName: 'SantiagoLoaiza',
        password: await bcrypt.hash("Default1", 10),
        email: 'sle.0394@hotmail.com',
        profileImage: null,
        role: 'superUser',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        userName: 'MiguelGonzales',
        password: await bcrypt.hash('Default2', 10),
        email: 'magonzalez9811@gmail.com',
        profileImage: null,
        role: 'superUser',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    ])
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('superUsers', {
      id: ['1', '2']  // Solo eliminar usuarios con id 1 y 2
    }, {});
  }
};
