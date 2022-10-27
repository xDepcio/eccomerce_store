'use strict';

const {FinalCategory, SubCategory, MainCategory} = require('../models')

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
    const mainCategories = [
      {
        name: 'Podzespoły komputerowe'
      },
      {
        name: 'Peryferia'
      },
      {
        name: 'Laptopy'
      },
      {
        name: 'Telefony'
      },
      {
        name: 'Gaming'
      },
      {
        name: 'Sprzęt AGD'
      },
      {
        name: 'Smartwatche'
      },
      {
        name: 'Smartwatche'
      },
      {
        name: 'Smartwatche'
      },
    ]

    const subCategories = [
      {
        name: 'Podzespoły komputerowe',
        mainCategoryName: 'Podzespoły komputerowe'
      },
      {
        name: 'Chłodzenia komputerowe',
        mainCategoryName: 'Podzespoły komputerowe'
      },
    ]

    const finalCategories = [
      {
        name: 'Karty graficzne',
        subCategoryName: 'Podzespoły komputerowe'
      },
      {
        name: 'Procesory',
        subCategoryName: 'Podzespoły komputerowe'
      },
      {
        name: 'Pamięci RAM',
        subCategoryName: 'Podzespoły komputerowe'
      },
      {
        name: 'Obudowy',
        subCategoryName: 'Podzespoły komputerowe'
      },
      {
        name: 'Dyski',
        subCategoryName: 'Podzespoły komputerowe'
      },
      {
        name: 'Płyty główne',
        subCategoryName: 'Podzespoły komputerowe'
      },
      {
        name: 'Zasilacze',
        subCategoryName: 'Podzespoły komputerowe'
      },
      {
        name: 'Inne',
        subCategoryName: 'Podzespoły komputerowe'
      },
      {
        name: 'Chłodzenia wodne',
        subCategoryName: 'Chłodzenia komputerowe'
      },
      {
        name: 'Chłodzenia CPU',
        subCategoryName: 'Chłodzenia komputerowe'
      },
      {
        name: 'Pasty termoprzewodzące',
        subCategoryName: 'Chłodzenia komputerowe'
      },
      {
        name: 'Chłodzenia komputera',
        subCategoryName: 'Chłodzenia komputerowe'
      },
      {
        name: 'Inne',
        subCategoryName: 'Chłodzenia komputerowe'
      },
    ]

    await queryInterface.bulkInsert('MainCategories', mainCategories)

    for(let i = 0; i < subCategories.length; i++) {
      let category = subCategories[i]
      let mainCategory = await MainCategory.findOne({
        where: {
          name: category.mainCategoryName
        }
      })

      await mainCategory.createSubCategory({
        name: category.name
      })
    }

    for(let i = 0; i < finalCategories.length; i++) {
      let category = finalCategories[i]
      let subCategory = await SubCategory.findOne({
        where: {
          name: category.subCategoryName
        }
      })

      await subCategory.createFinalCategory({
        name: category.name
      })
    }

    // await queryInterface.bulkInsert('SubCategories', [
    //   {
    //     name: 'Podzespoły komputerowe'
    //   },
    //   {
    //     name: 'Chłodzenia komputerowe'
    //   }
    // ])

    // await queryInterface.bulkInsert('FinalCategories', [
    //   {
    //     name: 'Procesory',
    //     subCategoryId: 1
    //   },
    //   {
    //     name: 'Karty graficzne',
    //     subCategoryId: 1
    //   },
    //   {
    //     name: 'Pamięci RAM',
    //     subCategoryId: 1
    //   },
    //   {
    //     name: 'Obudowy',
    //     subCategoryId: 1
    //   },
    //   {
    //     name: 'Dyski',
    //     subCategoryId: 1
    //   },
    //   {
    //     name: 'Chłodzenia CPU',
    //     subCategoryId: 2
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
