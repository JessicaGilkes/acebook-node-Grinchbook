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
        post.comments.forEach((c) => {
          console.log(
            "SinglePostController.Index: getting dateString for ",
            c.content
          );
          c.dateString = timeStamp(c.date);
          console.log("gave dateString: ", c.dateString);
        });
        post.dateString = timeStamp(post.date);
        let isLiked =
          post.likes.voters.map((v) => v._id).indexOf(req.session.user._id) != -1;
        let userIsAuthor = post.author._id.toString() === req.session.user._id.toString();
        res.render("singlepost/index", {
          post,
          author: post.author,
          loggedin: req.session.user,
          likescount: post.likes.count,
          voters: post.likes.voters.map((v) => v.username).join(", "),
          isLiked,
          userIsAuthor,
        });
      });
  },
  Unlike: (req, res) => {
    Post.updateOne(
      { _id: req.body.post_id },
      {
        $inc: { "likes.count": -1 },
        $pull: { "likes.voters": req.session.user._id },
      },
      () => {
        res.redirect("/singlepost?id=" + req.body.post_id);
      }
    );
  },
  Like: (req, res) => {
    console.log("SinglePostController.like", req.body);
    Post.updateOne(
      { _id: req.body.post_id },
      {
        $inc: { "likes.count": 1 },
        $push: { "likes.voters": req.session.user._id },
      },
      () => {
        res.redirect("/singlepost?id=" + req.body.post_id);
      }
    );
  },
  Delete: (req, res) => {
    Post.findById(req.body.post_id)
      .populate("author")
      .then((post) => {
        if (!post) {
          res
            .status(404)
            .json({ postnotfound: "No such post" + req.body.post_id });
        }
        console.log(
          "found",
          post.author._id,
          req.session.user._id,
          post.author._id == req.session.user._id
        );
        if (post.author._id != req.session.user._id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }
        post
          .remove()
          .then(() => res.redirect("/posts"))
          .catch((err) => {
            console.log(err);
            res.status(404).json({ postnotfound: "Post not found 1" });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ postnotfound: "Post not found" });
      });
  },
};
module.exports = SinglePostController;
