"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Loans", [
      {
        member_id: 1, // giả sử member_id = 1
        book_id: 1, // sách A
        loan_date: new Date(),
        due_date: new Date(new Date().setDate(new Date().getDate() + 7)),
        return_date: null,
        returned: false,
        fine_amount: 0,
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Loans", null, {});
  },
};
