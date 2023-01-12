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
        const user = new User(req.body);
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
    ).then((user) => {
      req.session.user = user;
      res.redirect("/");
    });
  },
};

module.exports = UsersController;
