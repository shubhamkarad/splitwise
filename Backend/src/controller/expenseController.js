const { Expense, ExpenseSplit } = require("../../models/expense");

exports.createExpense = async (req, res) => {
  try {
    const { amount, description, groupId, paidBy, splits } = req.body;
    const expense = await Expense.create({
      amount,
      description,
      groupId,
      paidBy,
    });
    await ExpenseSplit.bulkCreate(
      splits.map((split) => ({
        expenseId: expense.id,
        userId: split.userId,
        amount: split.amount,
      }))
    );
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getexpenses = async (req, res) => {
  try {
    const { groupId } = req.params;
    const expense = await Expense.findAll({
      where: { groupId },
      include: { ExpenseSplit },
    });
    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
