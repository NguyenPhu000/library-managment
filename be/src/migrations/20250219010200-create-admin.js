"use strict";
/**
 * Tạo bảng admin
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Admins", {
      admin_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      access_level: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      department: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      can_manage_users: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      can_manage_books: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

    // Thêm FK
    await queryInterface.addConstraint("Admins", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk_admin_userid",
      references: {
        table: "Users",
        field: "user_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Admins");
  },
};
