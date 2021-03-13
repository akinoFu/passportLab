/* indexRoute.js: generic pages */
const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

// ---------- Welcome Route ---------- //
// localhost:8000
router.get("/", (req, res) => {
  res.send("welcome");
});

// ---------- Dashboard Route ---------- //
// localhost:8000/dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

// ---------- Admin Route ---------- //
// localhost:8000/admin
router.get("/admin", ensureAuthenticated, (req, res) => {
  if (req.user.role === "admin") {    
    const sessions = {};
    for (id in req.sessionStore.sessions) {
      const cookie = JSON.parse(req.sessionStore.sessions[id]);
      sessions[id] = cookie.passport.user;
    };
    res.render("dashboard", {
      user: req.user,
      sessions: sessions
    });
  } else {
    res.send("You can't access the admin page");
  }
});

// ---------- Revoke Route ---------- //
// localhost:8000/revoke/:sessionId
router.get("/revoke/:sessionId", (req, res) => {
  sessionId = req.params.sessionId
  req.sessionStore.destroy(sessionId, (err) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect("/admin")
    }
  })
});



module.exports = router;
