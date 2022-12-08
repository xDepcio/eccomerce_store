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

    await queryInterface.bulkInsert('Deliveries', [
      {
        name: 'inpost',
        price: 999,
        imageUrl: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.6435-9/159971400_10158983480092999_1800449100154412108_n.png?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GV_E52C-tP8AX_lTXbR&_nc_ht=scontent-waw1-1.xx&oh=00_AfCRo7bpvG4QqlUehOAA3xmIh7BvJg0ZgmUvTug0xdcipQ&oe=63AB519F'
      },
      {
        name: 'dhl',
        price: 1299,
        imageUrl: 'https://jakimkurierem.pl/logo_kuriera/dhl_logo.svg'
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
