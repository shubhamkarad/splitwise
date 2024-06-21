const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const { User } = require("./user");

const Group = sequelize.define(
  "Group",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

const GroupMember = sequelize.define(
  "GroupMember",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
      },
    },
    groupId: {
      type: DataTypes.UUID,
      references: {
        model: Group,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

Group.belongsToMany(User, { through: GroupMember, foreignKey: 'groupId', otherKey: 'userId' });
User.belongsToMany(Group, { through: GroupMember, foreignKey: 'userId', otherKey: 'groupId' });

module.exports = { Group, GroupMember };
