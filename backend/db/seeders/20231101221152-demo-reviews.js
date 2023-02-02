'use strict';

const {Review, User, UserVoteReview} = require('../models');

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

    const reviews =  [
      {
        reviewerFirstName: 'Aleksander',
        reviewContent: 'Review item6 Aleksander',
        reviewerId: 1,
        itemId: 1,
        rating: 5
      },
      {
        reviewerFirstName: 'Mateusz',
        reviewContent: 'Review item6 Mateusz',
        reviewerId: 2,
        itemId: 1,
        rating: 3
      },
      {
        reviewerFirstName: 'Janusz',
        reviewContent: 'Review item6 Janusz',
        reviewerId: 3,
        itemId: 2,
        rating: 4
      },
      {
        reviewerFirstName: 'Norbert',
        reviewContent: 'Review item6 Norbert',
        reviewerId: 4,
        itemId: 3,
        rating: 2
      },
      {
        reviewerFirstName: 'Tomasz',
        reviewContent: 'Review item6 Tomasz',
        reviewerId: 5,
        itemId: 3,
        rating: 1
      }
    ]

    for(let i = 0; i < reviews.length; i++) {
      const review = await Review.create(reviews[i])
      await UserVoteReview.create({
        userId: Math.floor(Math.random() * 3) + 1,
        reviewId: review.id,
        voteValue: Math.sign(Math.random() - 0.5)
      })
    }

    // await queryInterface.bulkInsert('Reviews',)
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
