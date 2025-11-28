const User = require('../models/User');
const logger = require('../utils/logger');

exports.createUser = async (req, res, next) => {
  try {
    console.log('Request body:', req.body); // Debug
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name and email required' });

    const user = new User({ name, email });
    await user.save();
    console.log('User created:', user);
    res.status(201).json({ user });
  } catch (err) {
    console.error('createUser error:', err);
    next(err);
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    const users = await User.find().limit(50).lean();
    res.json({ users });
  } catch (err) {
    console.error('listUsers error:', err);
    next(err);
  }
};
