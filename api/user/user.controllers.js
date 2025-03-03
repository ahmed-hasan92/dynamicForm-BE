const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../Models/User');
require('dotenv').config();

const tokenSecret = process.env.JWT_SECRET;
const tokenExp = process.env.JWT_TOKEN_EXP;

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  const token = jwt.sign(payload, tokenSecret, {
    expiresIn: tokenExp,
  });
  return token;
};

exports.register = async (req, res, next) => {
  try {
    const email = req.body.email.trim();
    const password = req.body.password.trim();
    const existingEmail = await User.findOne({ email: email });

    if (existingEmail) {
      return res
        .status(403)
        .json({ message: 'This email is already exist try another one' });
    }

    req.body.password = await hashPassword(password);

    const newUser = await User.create({
      email,
      password: req.body.password,
    });

    const token = generateToken(newUser);

    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
