"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      // Member thuộc về 1 user
      Member.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      // 1 member có nhiều loan
      Member.hasMany(models.Loan, {
        foreignKey: "member_id",
      });
    }
  }
  Member.init(
    {
      member_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTEGER,
      member_code: DataTypes.STRING,
      join_date: DataTypes.DATE,
      expiry_date: DataTypes.DATE,
      max_loans: DataTypes.INTEGER,
      current_loans: DataTypes.INTEGER,
      status: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Member",
      tableName: "Members",
      timestamps: false,
    }
  );
  return Member;
};
