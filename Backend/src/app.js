const express = require("express");
const { initializeModels } = require("../models/index");
const authRoutes = require("./routes/authRoutes");
const groupRoutes = require("./routes/groupRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
require("dotenv").config();
const app = express();

const port = 3200;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/expenses", expenseRoutes);

initializeModels().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
