const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = mongoose.model('users');
const { JWT_SECRET } = require('../config/keys');
const auth = require('../middlewares/auth');

// change password
router.post(
  '/edit',
  auth,
  [
    check('newp', 'Password must be of at least 6 characters').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { newp, current } = req.body;

    try {
      const user = await User.findById(req.user.id);

      const isMatch = await bcrypt.compare(current, user.password);

      if (!isMatch)
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newp, salt);
      user.password = hash;

      await user.save();
      res.json({ msg: 'Password Updated' });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  }
);

// change phone
router.put(
  '/edit',
  auth,
  [
    check('phone', 'Phone Number must be of at least 10 characters').isLength({
      min: 10
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { phone } = req.body;

    try {
      const user = await User.findById(req.user.id);

      user.phone = phone;

      await user.save();
      res.json({ msg: 'Phone Number Updated' });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  }
);

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user)
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 3600 });
      res.json({
        token
      });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
