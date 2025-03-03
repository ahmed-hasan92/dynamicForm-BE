require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../Models/User');
const tokenSecret = process.env.JWT_SECRET;

const LocalStrategy = require('passport-local').Strategy;

const JwtStrategy = require('passport-jwt').Strategy;

const { fromAuthHeaderAsBearerToken } = require('passport-jwt').ExtractJwt;

const localStrategy = new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false);
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  },
);

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: tokenSecret,
  },

  async (payload, done) => {
    try {
      const user = await User.findOne({ _id: payload._id });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  },
);

module.exports = { localStrategy, jwtStrategy };
