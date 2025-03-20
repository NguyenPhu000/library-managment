"use strict";
/**
 * Tạo bảng book
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Books", {
      book_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      isbn: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      publication_year: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      publisher: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      total_copies: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      available_copies: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      status: {
        type: Sequelize.STRING(100),
        defaultValue: "AVAILABLE",
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      cover_image: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: [],
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Books");
  },
};
