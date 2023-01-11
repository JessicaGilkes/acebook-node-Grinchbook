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
        User.find({_id: {$nin: [...user.friends, user._id]}}).then((notFriends) => {
            // console.log("Not friends of ", user.username, ":", notFriends)
            res.render("friends/index", {
              loggedin: req.session.user,
              friends: user.friends,
              notFriends,
              hasFriends: user.friends.length > 0,
              hasNonfriends: notFriends.length > 0,
              username: req.session.user.username,
            });
        })
      });
  },
  Unfriend: (req, res) => {
    // console.log("friendsController.unfriend wants to unfriend", req.body);
    User.updateOne(
      { _id: req.session.user._id },
      { $pull: { friends: req.body.friend_id } },
      () => {
        res.redirect("/friends");
      }
    );
  },
  Follow: (req, res) => {
    // console.log("friendsController.Follow wants to follow", req.body);
    User.updateOne(
      { _id: req.session.user._id },
      { $push: { friends: req.body.friend_id } },
      () => {
        res.redirect("/friends");
      }
    );
  },
};

module.exports = FriendsController;
