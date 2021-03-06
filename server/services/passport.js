const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const config = require('../config');

// local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  // if verify is ok, call done with user
  // otherwise, call done without user
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }

    // compare passwords
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

// config for jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // payload - decrypted data - user id

  // see if the user id in payload exists in db.
  // if yes, call done with the user
  // otherwise, call done without user
  User.findById(payload.sub, function (err, user) {
    if (err) {
      // done(error, user); <- error, so we return false in user
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false); // didn't find a user
    }
  });
});

// tell password to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
