'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Loans', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state_id: {
        type: DataTypes.INTEGER,
        references: { model: "States", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      balance_with_interest: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      current_interest: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      installments_value: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      installments_times: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      maturity_date: {
        type: DataTypes.DATE,
        allowNull: false,
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
    return queryInterface.dropTable('Loans')
  }
};
