'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Aleksander',
        lastName: 'Drwal',
        email: 'demo@user.io',
        // username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        defaultAddressId: 1
      },
      {
        firstName: 'Mateusz',
        lastName: 'Drwal',
        email: 'user1@user.io',
        // username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Janusz',
        lastName: 'Brzęczyszczykiecz',
        email: 'user3@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Norbert',
        lastName: 'Jakubiak',
        email: 'user4@user.io',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Tomasz',
        lastName: 'Bąk',
        email: 'user5@user.io',
        hashedPassword: bcrypt.hashSync('password5')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
