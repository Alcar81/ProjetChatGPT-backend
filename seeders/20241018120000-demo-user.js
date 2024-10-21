// backend/seeders/20241018120000-demo-user.js

'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Hacher le mot de passe défini dans .env
    const password = process.env.DEMO_USER_PASSWORD;
    if (!password) {
      throw new Error("Le mot de passe DEMO_USER_PASSWORD n'est pas défini dans .env");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean.dupont@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Marie',
        lastName: 'Curie',
        email: 'marie.curie@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
