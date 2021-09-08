const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password required' });
  }

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(400).json({ msg: 'Incorrect email or password' });
    }

    const success = await bcrypt.compare(password, user.password);

    if (!success) {
      return res.status(400).json({ msg: 'Incorrect email or password' });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });

    res.json({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, password2 } = req.body;

  if (!firstName || !lastName || !email || !password || !password2) {
    return res.status(400).json({ msg: "Please fill in all fields" });
  }

  if (password !== password2) {
    return res.status(400).json({ msg: 'Passwords must match' });
  }

  try {
    let user = await User.findOne({ email }).exec();

    if (user) {
      return res.status(400).json({ msg: 'Please use a different email address' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = await User.create({ firstName, lastName, email, password: hash });

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server errors' });
  }
});

module.exports = router;
