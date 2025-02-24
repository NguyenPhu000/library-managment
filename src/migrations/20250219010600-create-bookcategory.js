"use strict";
/**
 * Tạo bảng BookCategory (bảng trung gian n-n giữa Book và Category)
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BookCategories", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      book_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      assigned_by: {
        type: Sequelize.INTEGER, // Tham chiếu user_id hoặc admin_id
        allowNull: true,
      },
      assigned_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Thêm FK
    await queryInterface.addConstraint("BookCategories", {
      fields: ["book_id"],
      type: "foreign key",
      name: "fk_bookcategory_bookid",
      references: {
        table: "Books",
        field: "book_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("BookCategories", {
      fields: ["category_id"],
      type: "foreign key",
      name: "fk_bookcategory_categoryid",
      references: {
        table: "Categories",
        field: "category_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // (Tùy chọn) FK assigned_by → user.user_id
    await queryInterface.addConstraint("BookCategories", {
      fields: ["assigned_by"],
      type: "foreign key",
      name: "fk_bookcategory_assignedby",
      references: {
        table: "Users",
        field: "user_id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("BookCategories");
  },
};
