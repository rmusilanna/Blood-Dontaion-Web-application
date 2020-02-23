const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('./keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      console.log(err);
      done(err, false);
    }
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        const { sub, name, picture, email } = profile._json;
        const existingUser = await User.findOne({ userId: sub });
        if (existingUser) return done(null, existingUser);
        const newUser = new User({
          userId: sub,
          name,
          picture,
          email
        });
        const user = await newUser.save();
        return done(null, user);
      }
    )
  );
};
