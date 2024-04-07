const passport = require("passport");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const user = mongoose.model("users");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT,
};
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const User = await user.findById(payload.userId).select("email id");
        if (User) {
          done(null, User);
        } else {
          done(null, false);
        }
      } catch (e) {
        console.log("error");
      }
    })
  );
};
