const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", { loggedin: req.session.user });
  },

  Create: (req, res) => {
    console.log(req.body);

    const email = req.body.email;

    User.findOne({ email: email }).then((user) => {
      if (user) {
        // email already in use
        res.status(409).render("users/new", { emailinuse: true });
      } else {
        const user = new User();
        user.email = email;
        user.username = req.body.username;
        user.setPassword(req.body.password);
        user.save((err) => {
          if (err) {
            throw err;
          }
          res.status(201).redirect("/posts");
        });
      }
    });
  },
  Profile_pic: (req, res) => {
    User.updateOne(
      { _id: req.session.user._id },
      {
        $set: { profile_pic: req.body.profile_pic },
      }
    )
      .then(() => {
        User.findOne({ _id: req.session.user._id }).then((user) => {
          req.session.user = user;
          res.redirect("/");
        });
      })
      .catch((err) => {
        console.log("usersController.Profile_pic:", err);
        res.render("error", { err });
      });
  },
};

module.exports = UsersController;
