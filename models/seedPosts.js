const { kirkID, picardID, siskoID, worfID, spockID } = require("./usesrIDs");
const Post = require("./post");
const today = new Date();

const posts = [
  {
    message: "The blood worms at Quarks are awful!",
    likes: { count: 2, voters: [siskoID, picardID] },
    author: worfID,
    date: today - 1000 * 3600 * 24 * 3,
  },
  {
    message: "Live long and prosper",
    likes: { count: 1, voters: [ picardID] },
    author: spockID,
    date: today - 1000 * 24,
  },
  {
    message: "Make it so!",
    likes: { count: 2, voters: [siskoID, picardID] },
    author: picardID,
    date: today - 1000 * 3600 * 5,
  },
  {
    message: "Space: the final frontier",
    likes: { count: 2, voters: [siskoID, picardID] },
    author: kirkID,
    date: new Date("1966-09-06"),
  },
  {
    message: "These are the voyages of the starship.... Enterprise.",
    likes: { count: 1, voters: [siskoID] },
    comments: [
      {
        content: "You're taking too long between phrases.",
        user_id: picardID,
        date: new Date("1988-09-06"),
      },
      {
        content: "It's for dramatic effect",
        user_id: kirkID,
        date: new Date("1988-09-06"),
      },
      {
        content: "And coming up: Try to say where no ONE has gone before",
        user_id: picardID,
        date: new Date("1988-09-06"),
      },
      {
        content:
          "It's the sixties, we didn't know better than to put women in short skirts",
        user_id: kirkID,
        date: new Date("1988-09-07"),
      },
      {
        content: "You have warp drive and teleportation, for God's sake",
        user_id: picardID,
        date: new Date("1988-09-07"),
      },
    ],
    author: kirkID,
    date: new Date("1966-09-13"),
  },
  {
    message:
      "It's five year mission to explore new worlds and new civilisations.",
    likes: { count: 0, voters: [] },
    author: kirkID,
    date: new Date("1966-09-20"),
  },
];

const seedPosts = async () => {
  await Post.deleteMany({});
  for (let p = 0; p < posts.length; p++) {
    const newPost = new Post(posts[p]);
    newPost.save((err) => {
      if (err) {
        throw err;
      }
      //   console.log("saved post: " + newPost.message)
    });
  }
};

module.exports = seedPosts;
