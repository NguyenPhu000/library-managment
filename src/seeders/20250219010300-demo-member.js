"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Giả sử user_id = 2 là memberUser
    return queryInterface.bulkInsert("Members", [
      {
        user_id: 2,
        member_code: "MEM123",
        join_date: new Date(),
        expiry_date: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ),
        max_loans: 5,
        current_loans: 0,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Members", null, {});
  },
};
