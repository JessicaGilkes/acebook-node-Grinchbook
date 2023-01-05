const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {loggedin: req.session.user});
  },

  Create: (req, res) => {
    console.log(req.body);

    const email = req.body.email;

    User.findOne({ email: email }).then((user) => {
      if (user) {
        // email already in use
        res.status(409).render("users/new",{emailinuse: true});
      } else {
        const user = new User(req.body);
        user.save((err) => {
          if (err) {
            throw err;
          }
          res.status(201).redirect("/posts");
        });
      }
    })

  },
};

module.exports = UsersController;
