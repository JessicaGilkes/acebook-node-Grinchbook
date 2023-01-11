const Post = require("../models/post");
const timeStamp = require("../helperFuncs/timeStamp");
const { ObjectID } = require("mongodb");

const SinglePostController = {
  Index: (req, res) => {
    if (!req.session.user) {
      res.redirect("/sessions/new");
    }
    const id = ObjectID(req.query.id);
    Post.findById(id)
      .populate("author")
      .populate("likes.voters")
      .populate("comments.user_id")
      .then((post) => {
        post.comments.forEach(c => {
          console.log("SinglePostController.Index: getting dateString for ", c.content)
          c.dateString = timeStamp(c.date)
          console.log("gave dateString: ", c.dateString)
        })
        console.log(post);
        res.render("singlepost/index", {
          post,
          author: post.author.username,
          loggedin: req.session.user,
          likescount: post.likes.count,
          voters: post.likes.voters.map(v => v.username).join(", ")
        });
      });
  },
};

module.exports = SinglePostController;
