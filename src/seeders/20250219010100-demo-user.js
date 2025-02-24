"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        username: "adminUser",
        password: "123456", // Nên mã hóa trong thực tế
        role: "ADMIN",
        first_name: "Admin",
        last_name: "User",
        gender: "male",
        email: "admin@example.com",
        phone: "0123456789",
        address: "123 Admin Street",
        is_active: true,
        create_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "memberUser",
        password: "123456",
        role: "MEMBER",
        first_name: "Member",
        last_name: "User",
        gender: "female",
        email: "member@example.com",
        phone: "0987654321",
        address: "456 Member Avenue",
        is_active: true,
        create_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
