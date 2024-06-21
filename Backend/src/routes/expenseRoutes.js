const { Expense, ExpenseSplit } = require("../../models/expense");
const {
  createExpense,
  getexpenses,
} = require("../controller/expenseController");
const { authenticate } = require("../../utils/middleware");
const express = require("express");
const router = express.Router();

router.post("/", authenticate, createExpense);
router.get("/:groupId", authenticate, getexpenses);

module.exports = router;
