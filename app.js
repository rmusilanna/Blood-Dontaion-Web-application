const express = require('express');
// const passport = require('passport');
// const cookieSession = require('cookie-session');
const path = require('path');
const mongoose = require('mongoose');
const cron = require('node-cron');
const { MONGO_URI } = require('./config/keys');

const app = express();

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to database'))
  .catch(err => console.log('Failed to connect to database', err));

require('./models/Subscription');
require('./models/User');
require('./models/Brequest');

const sendMonthlyEmails = require('./services/sendMonthlyEmails');

// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [COOKIE_SECRET]
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// require('./config/passport')(passport);
// app.get('/api/user', (req, res) => {
//   res.send(req.user);
// });

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/blood', require('./routes/brequest'));

cron.schedule('* * * * *', () => {
  sendMonthlyEmails();
  // 0 0 12 1 *
  // 0 12 * * * monthly
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
