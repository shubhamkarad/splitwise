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
    splitType: {
      type: DataTypes.STRING,
      allowNull: true,
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
    splitType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

Expense.hasMany(ExpenseSplit, { foreignKey: "expenseId", onDelete: "CASCADE" });
ExpenseSplit.belongsTo(Expense, { foreignKey: "expenseId" });

ExpenseSplit.belongsTo(User, { foreignKey: "userId" });
User.hasMany(ExpenseSplit, { foreignKey: "userId" });

Expense.belongsTo(User, { as: "paidByUser", foreignKey: "paidBy" });

Expense.belongsTo(Group, { foreignKey: "groupId" });
Group.hasMany(Expense, { foreignKey: "groupId" });

module.exports = { Expense, ExpenseSplit };
