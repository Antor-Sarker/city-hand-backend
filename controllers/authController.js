const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../services/token.js");

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

    //create Access token and Refresh token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
      })
      .json({ accessToken, userID: user._id, name: user.name, email });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ error: "Refresh token not found" });
    }

    const verifyed = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    if (!verifyed || !verifyed.id)
      return res.status(401).json({ error: "invalid token" });

    const user = await User.findById(verifyed?.id);
    if (!user || user.refreshToken !== token)
      return res.status(403).json({ error: "invalid token" });

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.logOut = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(204).json({ error: "token not found" });

    const user = await User.findOne({ refreshToken: token });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.clearCookie("refreshToken").json({ message: "loged out" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};
