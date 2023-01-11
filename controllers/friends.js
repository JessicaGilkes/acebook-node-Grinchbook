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
          hasFriends: user.friends.length > 0,
          username: req.session.user.username,
        });
      });
  },
  Unfriend: (req, res) => {
    console.log("friendsController.unfriend wants to unfriend", req.body);
    User.updateOne(
      { _id: req.session.user._id },
      { $pull: { friends: req.body.friend_id } },
      () => {
        res.redirect("/friends");
      }
    );
  },
};

module.exports = FriendsController;
