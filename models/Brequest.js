const mongoose = require('mongoose');
const { Schema } = mongoose;

const BRequestSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  bloodgrp: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  status: {
    type: Boolean,
    default: false
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  dateDonated: Date
});

module.exports = mongoose.model('brequests', BRequestSchema);
