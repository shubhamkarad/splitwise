const { Expense, ExpenseSplit } = require("../../models/expense");
const { GroupMember, Group } = require("../../models/group");
const { User } = require("../../models/user");
exports.createExpense = async (req, res) => {
  try {
    const { amount, description, groupId, paidBy, splits, splitType } =
      req.body;
    const isMember = await GroupMember.findOne({
      where: { groupId, userId: paidBy },
    });
    if (!isMember)
      return res
        .status(403)
        .json({ error: "User is not a member of this group" });

    const expense = await Expense.create({
      amount,
      description,
      groupId,
      paidBy,
      splitType,
    });

    let expenseSplits = [];
    if (splits && splits.length > 0 && splitType === "manually") {
      // Use provided split
      expenseSplits = splits.map((split) => ({
        expenseId: expense.id,
        userId: split.userId,
        amount: split.amount,
        splitType: splitType,
      }));
    } else {
      //  Split equally among all the users
      const groupMembers = await GroupMember.findAll({ where: { groupId } });
      console.log(
        splits.length,
        amount,
        "Amount--------------------------------"
      );
      const splitAmount = amount / splits.length;
      console.log(splits, amount, "Split Amount");
      expenseSplits = splits.map((member) => ({
        expenseId: expense.id,
        userId: member.userId,
        amount: splitAmount,
        splitType,
      }));
    }
    // Bulk create expense splits
    await ExpenseSplit.bulkCreate(expenseSplits);
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// exports.getexpenses = async (req, res) => {
//   try {
//     const { groupId } = req.params;
//     const expense = await Expense.findAll({
//       where: { groupId },
//       include: { ExpenseSplit },
//     });
//     res.json(expense);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

exports.getAllGroupExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: [
        {
          model: Group,
          attributes: ["id", "name"],
        },
        {
          model: User,
          as: "paidByUser",
          attrbutes: ["id", "name"],
        },
        {
          model: ExpenseSplit,
          include: [
            {
              model: User,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getGroupExpenses = async (req, res) => {
  try {
    const { groupId } = req.params;
    const expenses = await Expense.findAll({
      where: { groupId },
      include: [
        {
          model: Group,
          attributes: ["id", "name"],
        },
        {
          model: User,
          as: "paidByUser",
          attributes: ["id", "name"],
        },
        {
          model: ExpenseSplit,
          include: [
            {
              model: User,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });

    if (expenses.length === 0) {
      return res
        .status(404)
        .json({ error: "No expenses found for this group" });
    } else {
      return res.status(200).json(expenses);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expenses = await Expense.findOne({
      where: { id },
      include: [
        {
          model: Group,
          attributes: ["id", "name"],
        },
        {
          model: User,
          as: "paidByUser",
          attributes: ["id", "name"],
        },
        {
          model: ExpenseSplit,
          include: [
            {
              model: User,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });

    if (expenses.length === 0) {
      return res.status(404).json({ error: "No expenses found " });
    } else {
      return res.status(200).json(expenses);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
