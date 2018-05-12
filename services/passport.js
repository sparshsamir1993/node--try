const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys.js");
const user = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  user.findById(id).then(user => {
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
    (accessToken, refreshToken, profile, done) => {
      user.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new user({ googleId: profile.id, name: profile.displayName })
            .save()
            .then(user => done(null, user));
        }
      });
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
