// C:\projetChatGPT\backend\seeders\20241018120000-demo-user.js

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean.dupont@example.com',
        password: '$2b$10$N9qo8uLOickgx2f3o3aFe.OXn6UKO34gAcOt9DJOM1v3LQjN4whaK', // 'password' haché avec bcrypt
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Marie',
        lastName: 'Curie',
        email: 'marie.curie@example.com',
        password: '$2b$10$N9qo8uLOickgx2f3o3aFe.OXn6UKO34gAcOt9DJOM1v3LQjN4whaK', // 'password' haché avec bcrypt
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
