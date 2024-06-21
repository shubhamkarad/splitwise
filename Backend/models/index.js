const { sequelize, connectDB } = require("../config/database");
const { User } = require("./user");
const { Group, GroupMember } = require("./group");
const { Expense, ExpenseSplit } = require("./expense");

const initializeModels = async () => {
  await connectDB();
  await sequelize.sync({ alter: true });
};

module.exports = {
  User,
  Group,
  GroupMember,
  Expense,
  ExpenseSplit,
  initializeModels,
};
