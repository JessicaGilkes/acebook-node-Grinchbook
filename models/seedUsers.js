const User = require("./user");
const { kirkID, picardID, siskoID, rikerID, troyID, worfID, spockID } = require("./usesrIDs");

const users = [
  {
    email: "kirk@original.com",
    password: "finalFrontier",
    username: "James T Kirk",
    _id: kirkID,
    friends: [siskoID]
  },
  {
    email: "spock@original.com",
    password: "tinaTurner",
    username: "Mr. Spock",
    _id: spockID,
    friends: [siskoID, kirkID]
  },
  {
    email: "picard@ng.com",
    password: "makeItSo",
    username: "Jean Luc",
    _id: picardID,
    friends: [rikerID, troyID, worfID]
  },
  {
    email: "riker@ng.com",
    password: "numberOne",
    username: "William Riker",
    _id: rikerID,
  },
  {
    email: "troy@ng.com",
    password: "counsellor",
    username: "Deanna Troy",
    _id: troyID,
  },
  {
    email: "worf@ng.com",
    password: "klingon",
    username: "Worf",
    _id: worfID,
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
