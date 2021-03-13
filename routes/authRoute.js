/* authRoute.js: login related functions */

const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

// localhost:8000/auth/login
// Shows the login page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// localhost:8000/auth/login
// called when we click the login button
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);
// passport.authentication() calles login() function that calls serializeUser to store the current user in a session

// localhost:8000/auth/githubLogin
// called when we click the githubLogin button
router.get('/github',
  passport.authenticate('github'));

router.get(
  '/github/callback',
  passport.authenticate("github", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

// localhost:8000/auth/logout
// called when we click the logout button
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
