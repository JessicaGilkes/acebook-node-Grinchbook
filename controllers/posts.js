const timeStamp = require("../helperFuncs/timeStamp");
const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find()
      .populate("author")
      .then((posts) => {
        // if (err) {
        //   throw err;
        // }
        posts = posts.sort((a, b) => b.date - a.date);
        posts.forEach((p) => {
          // console.log("controllers.Posts.Index: Getting timeStamp for", p.message);
          p.dateString = timeStamp(p.date);
          // console.log("So gave a dateString of", p.dateString);
          p.author.isFriendOfUser =
            req.session.user.friends.indexOf(p.author._id.toString()) !== -1;
          p.authorIsUser =
            p.author._id.toString() === req.session.user._id.toString();
          console.log(
            "postsController.Index for each:",
            p.author.isFriendOfUser
          );
          console.log(
            "postsController.Index for each:",
            p.author._id,
            req.session.user._id,
            p.author._id.toString() === req.session.user._id.toString()
          );
        });
        res.render("posts/index", { posts: posts, loggedin: req.session.user });
      })
      .catch((err) => {
        throw err;
      });
  },
  New: (req, res) => {
    res.render("posts/new", { loggedin: req.session.user });
  },
  Create: (req, res) => {
    req.body.date = new Date();
    req.body.author = req.session.user._id;
    const post = new Post(req.body);
    console.log({ reqBody: req.body });
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
