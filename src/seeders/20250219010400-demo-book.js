"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Books", [
      {
        isbn: "978-1-56619-909-4",
        title: "Sách A",
        author: "Tác giả A",
        publication_year: 2020,
        publisher: "NXB ABC",
        total_copies: 5,
        available_copies: 5,
        status: "AVAILABLE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        isbn: "978-1-56619-123-4",
        title: "Sách B",
        author: "Tác giả B",
        publication_year: 2019,
        publisher: "NXB XYZ",
        total_copies: 3,
        available_copies: 3,
        status: "AVAILABLE",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Books", null, {});
  },
};
