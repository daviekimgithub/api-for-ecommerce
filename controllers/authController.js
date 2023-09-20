const User = require('../models/user');
const CustomError = require('../errors');
const { attachCookiesToResponse } = require('../utils');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new CustomError.BadRequestError('Email already in use');
  }

  //   // Register first user as an admin
  //   const isFirstAccount = (await User.countDocuments({})) === 0;
  //   const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({ name, email, password });

  const tokenUser = { name: user.name, userId: user.id, role: user.role };
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(201).json({ user: tokenUser });
};

const login = async (req, res) => {
  console.log(req.cookies);
  res.send('login');
};

const logout = async (req, res) => {
  // const users = await User.find({});
  const users = await User.deleteMany({});
  res.json({ users });
  // res.send('logout');
};

module.exports = {
  register,
  login,
  logout,
};
