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
    await queryInterface.bulkInsert('Reviews', [
      {
        reviewerFirstName: 'Aleksander',
        reviewContent: 'Bardzo dobra karta nie mam nic dodać nic ująć nawet się nie grzeje za bardzo',
        reviewerId: 1,
        itemId: 6,
        rating: 5
      },
      {
        reviewerFirstName: 'Mateusz',
        reviewContent: 'Bardzo dobra karta nie mam nic dodać nic ująć nawet się nie grzeje za bardzo',
        reviewerId: 1,
        itemId: 6,
        rating: 3
      },
      {
        reviewerFirstName: 'Janusz',
        reviewContent: 'Bardzo dobra karta nie mam nic dodać nic ująć nawet się nie grzeje za bardzo',
        reviewerId: 1,
        itemId: 6,
        rating: 4
      },
      {
        reviewerFirstName: 'Norbert',
        reviewContent: 'Norbert lubić karte',
        reviewerId: 1,
        itemId: 6,
        rating: 2
      },
      {
        reviewerFirstName: 'Tomasz',
        reviewContent: 'Bardzo dobra karta nie mam nic dodać nic ująć nawet się nie grzeje za bardzo',
        reviewerId: 1,
        itemId: 6,
        rating: 1
      }
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
