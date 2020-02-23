const router = require('express').Router();
const passport = require('passport');

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/dashboard');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
