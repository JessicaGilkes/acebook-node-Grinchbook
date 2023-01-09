const seedUsers = require("./seedUsers");
const seedPosts = require("./seedPosts");

const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0/acebook_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require("./user");
const dropUsers = async () => {
  //   console.log("dropping users");
  await User.deleteMany({});
};

const idToUser = (id) => {
  User.findOne({ _id: id }).then((user) => {
    return user;
  });
};

const Post = require("./post");
const dropPosts = async () => {
  //   console.log("Dropping posts");
  await Post.deleteMany({});
};

module.exports = { dropUsers, dropPosts, seedUsers, seedPosts, idToUser };
