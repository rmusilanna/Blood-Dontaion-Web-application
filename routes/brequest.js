const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const BRequest = mongoose.model('brequests');
const Subscription = mongoose.model('subscriptions');
const auth = require('../middlewares/auth');
const capitalize = require('../middlewares/capitalize');
const User = mongoose.model('users');
const Mailer = require('../services/Mailer');
const needBloodTemplate = require('../services/templates/needBlood');
const donorReadyTemplate = require('../services/templates/donorReady');
const donorCancelledTemplate = require('../services/templates/donorCancelled');

// Request for blood
router.post(
  '/request',
  [
    capitalize,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('bloodgrp', 'Blood group is required')
      .not()
      .isEmpty(),
    check('phone', 'Phone Number is required')
      .not()
      .isEmpty(),
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
      bloodgrp,
      phone,
      state,
      city,
      country,
      reminder
    } = req.body;

    let request = await BRequest.findOne({
      $and: [{ email }, { bloodgrp }, { status: false }]
    });

    if (request)
      return res
        .status(400)
        .json({ errors: [{ msg: `You've already made a request` }] });

    try {
      if (reminder) {
        const existingSub = await Subscription.findOne({ email });

        if (!existingSub) {
          const sub = new Subscription({ email, bloodgrp });
          await sub.save();
        }
      }

      const address = { city, state, country };
      request = new BRequest({
        name,
        email,
        bloodgrp,
        address,
        phone
      });

      await request.save();

      const donors = await User.find({
        $and: [{ email: { $ne: email }, bloodgrp }]
      }).select('-password');

      const recipients = donors.map(({ email }) => email);

      if (recipients.length > 0) {
        const brequest = {
          subject: `Need ${bloodgrp} Blood`,
          title: `Please help by donating your blood`,
          recipients
        };

        const mail = new Mailer(
          brequest,
          needBloodTemplate({ name, email, phone })
        );

        try {
          mail.send();
        } catch (err) {
          console.log(err);
        }
      }

      res.json({ request });
    } catch (err) {
      console.log(err);
      res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
  }
);

// search for blood
router.post(
  '/search',
  [
    capitalize,
    check('bloodgrp', 'Blood group is required')
      .not()
      .isEmpty(),
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

    const { bloodgrp, state, city, country } = req.body;
    try {
      const address = { city, state, country };

      const donors = await User.find({
        $and: [{ bloodgrp }, { address }]
      }).select('-password');

      res.json({ donors });
    } catch (err) {
      console.log(err);
      res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
  }
);

// Blood requests by user's blood group
router.get('/requests', auth, async (req, res) => {
  try {
    const { bloodgrp, email } = await User.findById(
      req.user.id,
      'bloodgrp email'
    );

    const requests = await BRequest.find({
      $and: [{ email: { $ne: email } }, { bloodgrp }, { status: { $ne: 1 } }]
    });
    res.json({ requests });
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
    console.log(err);
  }
});
// Donation History
router.get('/prev/requests', auth, async (req, res) => {
  try {
    const requests = await BRequest.find({ user: req.user.id }).sort({
      dateDonated: -1
    });
    res.json({ requests });
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
    console.log(err);
  }
});

// Track request
router.get('/track/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const request = await BRequest.findById(id);

    if (!request)
      return status(400).json({ errors: [{ msg: 'Request not found' }] });

    res.json({ request });
  } catch (err) {
    if (err.kind === 'ObjectId')
      res.status(400).json({ errors: [{ msg: 'Request not found' }] });
    console.log(err);
  }
});

// Donate
router.put('/request/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const request = await BRequest.findById(id);

    if (request.status)
      return res
        .status(400)
        .json({ msg: 'Request has already been satisfied' });

    request.user = req.user.id;
    request.status = true;
    request.dateDonated = Date.now();

    const { name, email, phone } = await User.findById(
      req.user.id,
      'name email phone'
    );

    const body = {
      subject: 'Donor Ready!',
      title: `Donor ready to donate ${request.bloodgrp} blood`,
      recipients: request.email
    };

    const mail = new Mailer(body, donorReadyTemplate({ name, email, phone }));

    try {
      mail.send();
      console.log('mail sent');
    } catch (err) {
      console.log(err);
    }

    await request.save();

    res.json({ request });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});
// Cancel donation
router.delete('/request/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const request = await BRequest.findById(id);

    if (!request.status)
      return res
        .status(400)
        .json({ msg: 'Please make a donation to cancel donation' });

    request.user = null;
    request.status = false;
    request.dateDonated = null;

    const { name } = await User.findById(req.user.id, 'name');

    const body = {
      subject: 'Blood request cancelled!',
      title: `Donor couldn't donate ${request.bloodgrp} blood`,
      recipients: request.email
    };

    const mail = new Mailer(body, donorCancelledTemplate({ id, name }));

    try {
      mail.send();
      console.log('mail sent');
    } catch (err) {
      console.log(err);
    }

    await request.save();

    res.json({ request });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
