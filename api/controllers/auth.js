const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await UserModel.create({
      name: username,
      email: email,
      password: hash,
    });

    return res.json({ status: 200 });
  } catch (err) {
    return res.json({ text: err, status: 400 });
  }
};

const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    // If user is authenticated
    const token = jwt.sign(
      { name: user.name, email: user.email },
      "securejwtkey"
    );
    return res.json({ status: 200, token: token, name: user.name });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { register, login };
