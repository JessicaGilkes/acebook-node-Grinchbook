const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      posts = posts.sort((a, b) => b.date - a.date)
      res.render("posts/index", { posts: posts, loggedin: req.session.user});
    });
  },
  New: (req, res) => {
    res.render("posts/new", {loggedin: req.session.user});
  },
  Create: (req, res) => {
    req.body.date = new Date()
    req.body.author = req.session.user._id
    const post = new Post(req.body);
    console.log({reqBody: req.body})
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
