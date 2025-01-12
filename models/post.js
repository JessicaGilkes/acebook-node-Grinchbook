const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  profile_pic: String,
  message: String,
  photo: String,
  date: Date,
  author: { type: ObjectID, ref: "User" },
  likes: { count: { type: Number, default: 0 }, voters: [{ type: ObjectID, ref: "User" }] },
  comments: [{ content: String, user_id: { type: ObjectID, ref: "User" }, date: Date }],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
