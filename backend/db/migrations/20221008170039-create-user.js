'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // username: {
      //   type: Sequelize.STRING(30),
      //   allowNull: false,
      //   unique: true
      // },
      defaultAddressId: {
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: 'Aleksander'
      },
      lastName: {
        type: Sequelize.STRING(40),
        allowNull: false,
        defaultValue: 'Drwal'
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
