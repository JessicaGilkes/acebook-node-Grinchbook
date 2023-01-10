const User = require("../models/user");

const FriendsController = {
  Index: (req, res) => {
    if (!req.session.user) {
      res.redirect("/sessions/new");
    }
    User.findOne({ _id: req.session.user._id })
      .populate("friends")
      .then((user) => {
        // console.log("friendsController.Index: found", user);
        res.render("friends/index", {
          loggedin: req.session.user,
          friends: user.friends,
          username: req.session.user.username,
        });
      });
  },
};

module.exports = FriendsController;
