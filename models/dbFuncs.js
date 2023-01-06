// const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0/acebook_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require("./user");
const dropUsers = async () => {
  console.log("dropping users");
  await User.deleteMany({});
};

const Post = require("./post");
const dropPosts = async () => {
  console.log("Dropping posts");
  await Post.deleteMany({});
};

const users = [
  {
    email: "kirk@original.com",
    password: "finalFrontier",
    username: "James T Kirk",
  },
  { email: "picard@ng.com", password: "makeItSo", username: "Jean Luc" },
  { email: "sisco@ds9.com", password: "emissary", username: "Benjamin Sisko" },
];

const seedUsers = async () => {
  await dropUsers();
  for (let u = 0; u < users.length; u++) {
    console.log({ newUser: users[u] });
    const user = new User(users[u]);
    user.save((err) => {
      if (err) {
        throw err;
      }
      console.log("saved user." + user.username);
    });
  }
};

module.exports = { dropUsers, dropPosts, seedUsers };
