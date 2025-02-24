"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // 1 user có thể là 1 admin
      User.hasOne(models.Admin, {
        foreignKey: "user_id",
      });
      // 1 user có thể là 1 member
      User.hasOne(models.Member, {
        foreignKey: "user_id",
      });
      // 1 user có thể có nhiều payment (nếu user thanh toán)
      User.hasMany(models.Payment, {
        foreignKey: "user_id",
      });
      // Ngoài ra, user có thể liên kết với BookCategory qua assigned_by
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      gender: DataTypes.ENUM("male", "female", "other"),
      role: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      create_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: false, // vì ta đang dùng create_at, updated_at custom
    }
  );
  return User;
};
