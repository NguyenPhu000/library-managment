'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('BookCategories', [
      {
        book_id: 1, // Sách A
        category_id: 1, // Khoa học
        assigned_by: 1, // user_id = 1 (adminUser)
        assigned_at: new Date()
      },
      {
        book_id: 2, // Sách B
        category_id: 2, // Văn học
        assigned_by: 1,
        assigned_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('BookCategories', null, {});
  }
};
