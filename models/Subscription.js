const mongoose = require('mongoose');

const SubscriptionSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  bloodgrp: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('subscriptions', SubscriptionSchema);
