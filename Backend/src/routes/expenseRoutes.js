const { Expense, ExpenseSplit } = require("../../models/expense");
const {
  createExpense,
  getGroupExpenses,
  getAllGroupExpenses,
} = require("../controller/expenseController");
const { authenticate } = require("../../utils/middleware");
const express = require("express");
const router = express.Router();

router.post("/", authenticate, createExpense);
router.get("/:groupId", authenticate, getGroupExpenses);
router.get("/", authenticate, getAllGroupExpenses);
module.exports = router;
