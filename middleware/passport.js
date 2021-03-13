const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controllers/userController");
const GitHubStrategy = require("passport-github").Strategy;
require('dotenv').config();

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    // Check if User exists in the database
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)  // --> jump back to passport.authenticate(...) in the authRoute.js
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

const githubLogin = new GitHubStrategy({
    // clientID: "bc06df1799fe08f551ab",
    // clientSecret: "34fb970097885f5742cc47a59eeb35c7eb134030",
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/github/callback"
  },
  (accessToken, refreshToken, profile, done)  => {
    console.log(profile)
    const user = userController.getUserByGitHubIdOrCreate(profile)
    return done(null, user)
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
);

// req.session.passport.user
// Create a session and req.user 
//   * req.user: all the information about the currently logged in user
passport.serializeUser(function (user, done) {  // "user" comes from passport.locallogin --> passport.authenticate
  done(null, user.id);  // Store the current user's ID in the session
});


// Called every single time you make a requrest to some protected page
//     check if the id stored in the session exists in the database
passport.deserializeUser(function (id, done) {
  // Get actual user object from the database and store that inside of request.user
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin).use(githubLogin);
