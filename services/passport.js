const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys.js");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      } 
      const user = await new User({ googleId: profile.id, name: profile.displayName }).save();
      done(null, user);
    }
  )
);

// passport.use(
//   new FacebookStrategy({
//     clientID: keys.facebookAppID,
//     clientSecret: keys.facebookAppSecret,
//     callbackURL: "/auth/facebook/callback"
//   },
//     (accessToken, refreshToken, profile, cb) => {
//       user.findOne({facebookId: profile.id}).then( existingFBUser =>{
//         if(existingFBUser){

//         }
//         else{
//           user.findOne({email: profile.email}).then( existingUser =>{
//             if(existingUser){

//             }
//             else{
//               new user({facebookId: profile.id})
//             }
//           })
//         }
//       })
//     })
// );
