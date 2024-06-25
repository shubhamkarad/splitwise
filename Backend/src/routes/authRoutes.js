const express = require("express");
const { register, login, getUsers } = require("../controller/authController");
const router = express.Router();
const { authenticate } = require("../../utils/middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/users", authenticate, getUsers);
router.get("/user/:userId", authenticate, getUsers);

module.exports = router;
