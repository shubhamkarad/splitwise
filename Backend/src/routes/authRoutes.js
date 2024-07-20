const express = require("express");
const {
  register,
  login,
  getUsers,
  getUserById,
} = require("../controller/authController");
const router = express.Router();
const { authenticate } = require("../../utils/middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/users", authenticate, getUsers);
router.get("/user/:userId", authenticate, getUserById);

module.exports = router;
