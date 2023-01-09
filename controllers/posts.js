const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      posts = posts.sort((a, b) => b.date - a.date);
      posts.forEach((p) => {
        let elapsed = Date.now() - p.date;
        console.log("time since", p.date, "is:", elapsed);
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const week = day * 7;
        if (elapsed < minute) {
          p.dateString = `${Math.floor(elapsed / second)} seconds ago`;
        } else if (elapsed < hour) {
          p.dateString = `${Math.floor(elapsed / minute)} minutes ago`;
        } else if (elapsed < day) {
          p.dateString = `${Math.floor(elapsed / hour)} hours ago`;
        } else if (elapsed < week) {
          p.dateString = `${Math.floor(elapsed / day)} days ago`;
        } else {
          p.dateString = p.date.toDateString();
        }
        console.log("so gave a dateString of:", p.dateString);
      });
      console.log("Posts controller.Index: ", posts[0].dateString);
      res.render("posts/index", { posts: posts, loggedin: req.session.user });
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
