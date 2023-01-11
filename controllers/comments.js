const Post = require("../models/post");

const CommentsController = {
  Create: (req, res) => {
    console.log("CommentsController.Create:", req.body);
    Post.updateOne(
      { _id: req.body.post_id },
      {
        $push: {
          comments: {
            date: new Date(),
            content: req.body.comment,
            user_id: req.session.user._id,
          },
        },
      },
      (err) => {
        if (err) {
          res.render("error.hbs");
        }
        res.redirect("/singlepost?id=" + req.body.post_id);
      }
    );
  },
};

module.exports = CommentsController;
