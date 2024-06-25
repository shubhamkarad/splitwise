const { sequelize } = require("../../config/database");
const { Group, GroupMember } = require("../../models/group");
const { User } = require("../../models/user");

exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const existingGroup = await Group.findOne({ where: { name } });
    if (existingGroup) {
      return res.status(400).json({ error: "Group name already exists!" });
    }
    const group = await Group.create({ name, createdBy: req.user.id });
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addMembersToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { members } = req.body;
    const groupUsers = await GroupMember.bulkCreate(
      members.map((member) => ({
        userId: member,
        groupId,
      }))
    );
    res.status(201).json(groupUsers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get single group
exports.getGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findOne({
      where: { id: groupId },
      include: {
        model: User,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.findAll({
      include: {
        model: User,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    });
    res.json(groups);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteGroup = async (req, res) => {
  const { groupId } = req.params;
  console.log(groupId, "Group");
  const transaction = await sequelize.transaction();
  try {
    // find the Group
    const group = await sequelize.transaction();
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Delete the Group memebers
    await GroupMember.destroy({ where: { groupId }, transaction });

    // Delete the Group

    await Group.destroy({ where: { id: groupId }, transaction });

    await transaction.commit();
    res.status(201).json({ message: "Group deleted successfully" });
  } catch (err) {
    await transaction.rollback();
    res.status(400).json({ error: err.message });
  }
};
