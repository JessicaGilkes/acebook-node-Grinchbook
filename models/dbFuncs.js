const { ObjectID } = require("mongodb");
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

const kirkID = ObjectID("63b810bd87affe92a654e712");
const users = [
  {
    email: "kirk@original.com",
    password: "finalFrontier",
    username: "James T Kirk",
    _id: kirkID,
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

const posts = [
  {
    message: "Space: the final frontier",
    likes: 328,
    author: kirkID,
    date: new Date("1966-09-06"),
  },
  {
    message: "These are the voyages of the starship.... Enterprise.",
    likes: 209,
    author: kirkID,
    date: new Date("1966-09-13"),
  },
  {
    message:
      "It's five year mission to explore new worlds and new civilisations.",
    likes: 199,
    author: kirkID,
    date: new Date("1966-09-20"),
  },
];

const seedPosts = async () => {
  await dropPosts();
  for (let p = 0; p < posts.length; p++) {
    const newPost = new Post(posts[p]);
    console.log({ newPost });
    newPost.save((err) => {
      if (err) {
        throw err;
      }
      console.log("saved post: " + newPost.message)
    });
  }
};

module.exports = { dropUsers, dropPosts, seedUsers, seedPosts };
