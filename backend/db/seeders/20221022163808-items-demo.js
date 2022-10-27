'use strict';
const {FinalCategory} = require('../models')

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
    const items = [
      {
        name: 'Intel i5-11400f',
        category: 'Procesory'
      },
      {
        name: 'Intel i3-10100f',
        category: 'Procesory'
      },
      {
        name: 'AMD Ryzen R5-3600',
        category: 'Procesory'
      },
      {
        name: 'AMD Ryzen R7-3800',
        category: 'Procesory'
      },
      {
        name: 'Intel Xeon Gold',
        category: 'Procesory'
      },
      {
        name: 'RTX 3060 ti',
        category: 'Karty graficzne'
      },
      {
        name: 'RTX 3070',
        category: 'Karty graficzne'
      },
      {
        name: 'RTX 3080',
        category: 'Karty graficzne'
      },
      {
        name: 'RX 6700 XT',
        category: 'Karty graficzne'
      },
      {
        name: 'Nvidia Titan',
        category: 'Karty graficzne'
      },
      {
        name: 'Bequiet Pure Dark Rock 4 PRO',
        category: 'Chłodzenia CPU'
      },
      {
        name: 'SilentiumPC Fera 5 Dual',
        category: 'Chłodzenia CPU'
      },
      {
        name: 'SilentiumPC Fera 5',
        category: 'Chłodzenia CPU'
      }
    ]

    for(let i = 0; i < items.length; i++) {
      let item = items[i]
      let foundCategory = await FinalCategory.findOne({
        where: {
          name: item.category
        }
      })
      await foundCategory.createItem({
        name: item.name
      })

    }
    // await queryInterface.bulkInsert('Items', [
    //   {
    //     name: 'Intel i5-11400f',
    //     categoryId: 1
    //   }
    // ])
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
