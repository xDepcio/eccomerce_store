'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Addresses', [
      {
        firstName: 'Aleksander',
        lastName: 'Drwal',
        city: 'Giżycko',
        street: 'Koszarowa 3',
        flatNumber: '2',
        postCode: '11-500',
        phoneNumber: 501158952,
        email: 'olek.drwal@gmail.com',
        userId: 1
      },
      {
        firstName: 'Emilia',
        lastName: 'Szostek-Drwal',
        city: 'Kętrzyn',
        street: 'Daszyńskiego 31',
        flatNumber: 'A',
        postCode: '11-400',
        phoneNumber: 510066432,
        email: 'emilia.szostek@lab-optimed.pl',
        userId: 1
      },
      {
        firstName: 'Mateusz',
        lastName: 'Drwal',
        city: 'Kraków',
        street: 'Prosta 26',
        flatNumber: '17',
        postCode: '03-430',
        phoneNumber: 501158957,
        email: 'mateusz.drwal@gmail.com',
        userId: 2
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
