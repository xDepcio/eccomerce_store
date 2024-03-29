'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'FinalCategories'}
      },
      imagesUrl: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      specs: {
        type: Sequelize.TEXT
      },
      stripePriceId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // in postgres: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // in postgres: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Items');
  }
};
