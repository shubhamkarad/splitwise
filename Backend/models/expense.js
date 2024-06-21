const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const { User } = require("./user");
const { Group } = require("./group");

const Expense = sequelize.define(
  "Expense",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    groupId: {
      type: DataTypes.UUID,
      references: {
        model: Group,
        key: "id",
      },
    },
    paidBy: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

const ExpenseSplit = sequelize.define(
  "ExpenseSplit",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    expenseId: {
      type: DataTypes.UUID,
      references: {
        model: Expense,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
      },
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Expense.hasMany(ExpenseSplit);
ExpenseSplit.belongsTo(Expense);

module.exports = { Expense, ExpenseSplit };
