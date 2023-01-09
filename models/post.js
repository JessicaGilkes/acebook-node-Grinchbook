const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  date: Date,
  author: ObjectID,
  likes: { count: { type: Number, default: 0 }, voters: [ObjectID] },
  comments: [{ content: String, user_id: ObjectID, date: Date }],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
