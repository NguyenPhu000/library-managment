"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Giả sử user_id = 1 là adminUser
    return queryInterface.bulkInsert("Admins", [
      {
        user_id: 1,
        access_level: 10,
        department: "IT Department",
        can_manage_users: true,
        can_manage_books: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Admins", null, {});
  },
};
