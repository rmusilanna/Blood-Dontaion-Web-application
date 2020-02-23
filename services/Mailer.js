const sgMail = require('@sendgrid/mail');
const { SENDGRID_KEY } = require('../config/keys');
sgMail.setApiKey(SENDGRID_KEY);

class Mailer {
  constructor({ subject, title, recipients, body }, mailBody) {
    this.body = body;
    this.title = title;
    this.subject = subject;
    this.recipients = recipients;
    this.template = mailBody;
  }

  async send() {
    try {
      console.log('recipients', this.recipients);
      const msg = {
        to: this.recipients,
        from: 'no-reply@bdonation.com',
        subject: this.subject,
        text: this.title,
        html: this.template
      };
      await sgMail.send(msg, true);
    } catch (err) {
      console.log('sending failed', err);
    }
  }
}

module.exports = Mailer;
