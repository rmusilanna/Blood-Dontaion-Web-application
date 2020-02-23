const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const { JWT_SECRET } = require('../config/keys');
const User = mongoose.model('users');
const capitalize = require('../middlewares/capitalize');

// Register
router.post(
  '/',
  [
    capitalize,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must be of at least 6 characters').isLength({
      min: 6
    }),
    check('bloodgrp', 'Blood group is required')
      .not()
      .isEmpty(),
    check('phone', 'Phone number must be of at least 10 characters').isLength({
      min: 10
    }),
    check('city', 'City is required')
      .not()
      .isEmpty(),
    check('state', 'State is required')
      .not()
      .isEmpty(),
    check('country', 'Country is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      name,
      email,
      password,
      bloodgrp,
      phone,
      city,
      state,
      country
    } = req.body;
    // console.log(req.body);

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });

    const address = { city, state, country };

    const newUser = new User({
      name,
      email,
      password,
      bloodgrp,
      phone,
      address
    });

    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;

      const user = await newUser.save();

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 3600 });
      res.json({
        token
      });
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
