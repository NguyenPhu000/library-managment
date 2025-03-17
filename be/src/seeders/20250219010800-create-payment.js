"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Payments", [
      {
        loan_id: 1, // liên kết với loan đã tạo
        user_id: 2, // giả sử user_id = 2 (memberUser) thanh toán
        amount: 0,
        payment_date: new Date(),
        payment_method: "CASH",
        status: "COMPLETED",
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Payments", null, {});
  },
};
