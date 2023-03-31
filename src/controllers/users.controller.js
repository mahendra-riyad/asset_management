const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("Wrong Credentials");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).json("Wrong Credentials");

    const payload = {
      user: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });
    return res
      .status(200)
      .json({ message: "Successfuly Authenticated", token });
  } catch (error) {
    console.log(`we got error while login (users.controller.js) ${error}`);
    return res.status(400).json({
      error: `${error}`,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ status: false, message: "Account Taken" });

    user = new User({ name, email, password });
    const token = user.generateToken();
    await user.save();
    return res
      .status(200)
      .json({ status: true, token, message: "Registration Complete" });
  } catch (error) {
    console.log(`we got error while signup (users.controller.js) ${error}`);
    return res.status(500).json({
      status: false,
      message: "Server error, Unable to register",
    });
  }
};
