"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    static associate(models) {
      // 1 loan thuộc về 1 member
      Loan.belongsTo(models.Member, {
        foreignKey: "member_id",
      });
      // 1 loan thuộc về 1 book
      Loan.belongsTo(models.Book, {
        foreignKey: "book_id",
      });
    }
  }
  Loan.init(
    {
      loan_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      member_id: DataTypes.INTEGER,
      book_id: DataTypes.INTEGER,
      loan_date: DataTypes.DATE,
      due_date: DataTypes.DATE,
      return_date: DataTypes.DATE,
      returned: DataTypes.BOOLEAN,
      fine_amount: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Loan",
      tableName: "Loans",
      timestamps: false,
    }
  );
  return Loan;
};
