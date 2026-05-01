const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const formatUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role
});

const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters." });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    return res.status(409).json({ message: "An account with this email already exists." });
  }

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: role === "admin" ? "admin" : "member"
  });

  res.status(201).json({
    user: formatUser(user),
    token: generateToken(user._id)
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  res.json({
    user: formatUser(user),
    token: generateToken(user._id)
  });
};

const getMe = (req, res) => {
  res.json({ user: formatUser(req.user) });
};

const listUsers = async (req, res) => {
  const search = (req.query.search || "").trim();
  const filter = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } }
        ]
      }
    : {};

  const users = await User.find(filter).select("name email role").sort({ name: 1 }).limit(30);
  res.json(users);
};

module.exports = {
  signup,
  login,
  getMe,
  listUsers
};
