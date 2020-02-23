const mongoose = require('mongoose');
const Subscription = mongoose.model('subscriptions');
const Mailer = require('./Mailer');
const subscription = require('./templates/subscription');

module.exports = async () => {
  const subs = await Subscription.find({}, 'email');
  const recipients = subs.map(({ email }) => email);

  if (recipients.length > 0) {
    const email = {
      subject: `Blood availability reminder`,
      title: `Please check if blood is available`,
      recipients
    };

    console.log('send to', recipients);

    const mail = new Mailer(email, subscription());

    try {
      mail.send();
    } catch (err) {
      console.log(err);
    }
  }
};
