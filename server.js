const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const path = require("path");
const port = process.env.port || 8000;

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./middleware/passport");
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");

// Middleware for express
app.use(express.json());        // not stricktly required (can be removed)
app.use(expressLayouts);        // to use layout.ejs (stores common code for all the ejs file)
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);

  console.log(`Session stored: `);
  console.log(req.sessionStore.sessions);

  console.log(`======================`);
  next();
});

// If there is a request to "localhost:8000/", go into the indexRoute file
app.use("/", indexRoute);

// If there is a request to "localhost:8000/auth", go into the authRoute file
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
