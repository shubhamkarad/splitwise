const jwt = require("jsonwebtoken");
const {User} = require("../models/user");

exports.authenticate = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded, "decoded")
    req.user = await User.findByPk(decoded.id);
    console.log(req.user, "user")
    if (!req.user) return res.status(401).json({ error: "User not found" });
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};
