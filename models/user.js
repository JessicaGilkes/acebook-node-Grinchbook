const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  profile_pic: String,
  friends: [{ type: ObjectID, ref: "User" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
