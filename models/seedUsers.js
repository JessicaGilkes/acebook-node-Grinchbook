const User = require("./user");
const { kirkID, picardID, siskoID } = require("./usesrIDs");

const users = [
  {
    email: "kirk@original.com",
    password: "finalFrontier",
    username: "James T Kirk",
    _id: kirkID,
  },
  {
    email: "picard@ng.com",
    password: "makeItSo",
    username: "Jean Luc",
    _id: picardID,
  },
  {
    email: "sisco@ds9.com",
    password: "emissary",
    username: "Benjamin Sisko",
    _id: siskoID,
  },
];

const seedUsers = async () => {
  await User.deleteMany({});
  for (let u = 0; u < users.length; u++) {
    const user = new User(users[u]);
    user.save((err) => {
      if (err) {
        throw err;
      }
      //   console.log("saved user." + user.username);
    });
  }
};

module.exports = seedUsers;
