// controllers/userController.js
const { db } = require('../models');
const User = db.User;
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log('Error in Creating user : ', error);
    res.status(400).json({ message: error.message });
  }
};
