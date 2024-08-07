'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `
      INSERT INTO public."States" (id, "uf", interest, "created_at", "updated_at") VALUES(1, 'MG', 1.0, NOW(), NOW());
      INSERT INTO public."States" (id, "uf", interest, "created_at", "updated_at") VALUES(2, 'SP', 0.80, NOW(), NOW());
      INSERT INTO public."States" (id, "uf", interest, "created_at", "updated_at") VALUES(3, 'RJ', 0.90, NOW(), NOW());
      INSERT INTO public."States" (id, "uf", interest, "created_at", "updated_at") VALUES(4, 'ES', 1.11, NOW(), NOW());
      `
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("States", {});
  }
};
