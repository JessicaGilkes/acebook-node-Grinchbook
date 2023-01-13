const User = require("../models/user");

const SessionsController = {
  New: (req, res) => {
    res.render("sessions/new", {loggedin: req.session.user});
  },

  Create: (req, res) => {
    console.log("trying to log in");
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        res.redirect("/sessions/new");
      } else if (user.validPassword(password)) {
        req.session.user = user;
        console.log("logged in as", req.session.user)
        res.redirect("/posts");
      } else {
        console.log("password invalid!")
        res.redirect("/sessions/new");
      }
    });
  },

  Destroy: (req, res) => {
    console.log("logging out");
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie("user_sid");
    }
    res.redirect("/sessions/new");
  },
};

module.exports = SessionsController;
