'use strict';

const categories = require('../../../dummyData');
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

    for(let i = 0; i < categories.length; i++) {
      let mainCategory = categories[i]

      await MainCategory.create({
        name: mainCategory.name,
        categoryImg: mainCategory.imgUrl
      })

      let mainCategoryDB = await MainCategory.findOne({
        where: {
          name: mainCategory.name
        }
      })


      for(let j = 0; j < mainCategory.subCategories.length; j++) {
        let subCategory = mainCategory.subCategories[j]

        await mainCategoryDB.createSubCategory({
          name: subCategory.name,
          categoryImg: subCategory.imgUrl
        })

        let subCategoryDB = await SubCategory.findOne({
          where: {
            name : subCategory.name
          }
        })


        for(let g = 0; g < subCategory.finalCategories.length; g++) {
          let finalCategory = subCategory.finalCategories[g]

          await subCategoryDB.createFinalCategory({
            name: finalCategory.name,
            categoryImg: finalCategory.imgUrl
          })
        }
      }
    }

    // await queryInterface.bulkInsert('MainCategories', mainCategories)

    // for(let i = 0; i < subCategories.length; i++) {
    //   let category = subCategories[i]
    //   let mainCategory = await MainCategory.findOne({
    //     where: {
    //       name: category.mainCategoryName
    //     }
    //   })

    //   await mainCategory.createSubCategory({
    //     name: category.name
    //   })
    // }

    // for(let i = 0; i < finalCategories.length; i++) {
    //   let category = finalCategories[i]
    //   let subCategory = await SubCategory.findOne({
    //     where: {
    //       name: category.subCategoryName
    //     }
    //   })

    //   await subCategory.createFinalCategory({
    //     name: category.name
    //   })
    // }

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
