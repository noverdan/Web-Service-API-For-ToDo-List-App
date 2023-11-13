'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('todos', [
      {
        user_id: 1,
        task: "Belajar RestAPI",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        task: "Nonton Konser BMKG",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        task: "Menamatkan Carrer Mode Fifa",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { user_id: 1 });
  }
};
