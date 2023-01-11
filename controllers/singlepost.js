const Post = require("../models/post");
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
      .then((post) => {
        let isLiked = post.likes.voters.map(v => v._id).indexOf(req.session.user._id) != -1
        console.log(isLiked);
        console.log(post.likes.voters.indexOf(req.session.user._id));
        res.render("singlepost/index", {
          post,
          author: post.author.username,
          loggedin: req.session.user,
          likescount: post.likes.count,
          voters: post.likes.voters.map(v => v.username).join(", "),
          isLiked
        });
      });
  },
  Unlike: (req, res) => {
    Post.updateOne(
      { _id: req.body.post_id },
      { $inc: { "likes.count": -1 }, $pull: { "likes.voters": req.session.user._id }},
      () => {
        res.redirect("/singlepost?id="+ req.body.post_id);
      }
    );
  },
  Like: (req, res) => {
    console.log("SinglePostController.like", req.body)
    Post.updateOne(
      { _id: req.body.post_id },
      { $inc: { "likes.count": 1 }, $push: { "likes.voters": req.session.user._id }},
      () => {
        res.redirect("/singlepost?id="+ req.body.post_id);
      }
    );
  },
};

module.exports = SinglePostController;
