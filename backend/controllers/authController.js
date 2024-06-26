const User = require("../models/UserModel");
const authTokenGenerate = require("../security/generateToken");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword, role, subject } =
      req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Password does not match" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      subject,
    });

    await newUser.save();
    if (newUser) {
      authTokenGenerate(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        message: "registered successfully",
      });
    } else {
      res.status(400).json({ message: "User not registered" });
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message,"signup");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    authTokenGenerate(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      message: "logged in successfully",
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message,"login");
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("_id");
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    res.status(500).send(error.message,"logout");
  }
};

module.exports = {
  signup,
  login,
  logout,
};
