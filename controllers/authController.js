const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    //check existin
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "user already exists with this email" });

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, name, password: hashPassword });
    await newUser.save();

    return res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    return res.status(500).json({ error: "user creation failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });

    if (!user) return res.status(404).json({ message: "user not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "wrong password" });

    //create jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .json({ token, userID: user._id, name: user.name, email });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};
