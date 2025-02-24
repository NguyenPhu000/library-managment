"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      // Admin thuộc về 1 user
      Admin.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  Admin.init(
    {
      admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTEGER,
      access_level: DataTypes.INTEGER,
      department: DataTypes.STRING,
      can_manage_users: DataTypes.BOOLEAN,
      can_manage_books: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Admin",
      tableName: "Admins",
      timestamps: false,
    }
  );
  return Admin;
};
