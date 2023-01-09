const Post = require("../models/post");
const User = require("../models/user");
const { ObjectID } = require("mongodb");

const SinglePostController = {
  Index: (req, res) => {
    const id = ObjectID(req.query.id);
    Post.findById(id, (err, post) => {
      if (err) {
        throw err;
      }
      console.log("From singlepost controller:", post);

      const authorID = post.author;
      console.log(typeof authorID)
      User.findById(authorID, (err, author) => {
        if (err) {
          throw err;
        }
        if (!author) {
          console.log(`can't find author with ID ${authorID}`);
          author = {username: "anon"}
        }
        console.log(author);
        res.render("singlepost/index", {
          post,
          author: author.username,
          loggedin: req.session.user,
        });
      });
      // res.send("Hello we are here" + (req.query.id));
      // console.log(req.url);
    });
  },
};

module.exports = SinglePostController;
