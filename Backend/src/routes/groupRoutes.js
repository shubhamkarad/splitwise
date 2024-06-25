const express = require("express");
const {
  createGroup,
  getGroups,
  deleteGroup,
  getGroup,
  addMembersToGroup,
} = require("../controller/groupController");
const { authenticate } = require("../../utils/middleware");
const router = express.Router();

router.post("/", authenticate, createGroup);
router.get("/", authenticate, getGroups);
router.get("/:groupId", authenticate, getGroup);
router.post("/:groupId/members", authenticate, addMembersToGroup);
router.delete("/:groupId", authenticate, deleteGroup);

module.exports = router;
