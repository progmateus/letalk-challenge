'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('States', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      uf: {
        type: DataTypes.STRING,
        allowNull: false
      },
      interest: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('States')
  }
};
