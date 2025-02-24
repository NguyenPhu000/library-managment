"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Categories", [
      {
        name: "Khoa học",
        description: "Sách khoa học các lĩnh vực",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Văn học",
        description: "Sách văn học, tiểu thuyết",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
