const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  email: String,
  // password: String,
  hash: String,
  salt: String,
  username: String,
  profile_pic: String,
  friends: [{ type: ObjectID, ref: "User" }],
});

UserSchema.methods.setPassword = function (password) {
  // console.log("setP start:", this._doc);
  this._doc.salt = crypto.randomBytes(16).toString("hex");
  this._doc.hash = crypto
    .pbkdf2Sync(password, this._doc.salt, 1000, 64, "sha512")
    .toString("hex");
  // console.log("setting password for ", this._doc.username);
  // console.log("result:", this._doc);
};

UserSchema.methods.validPassword = function (password) {
  let hash = crypto
    .pbkdf2Sync(password, this._doc.salt, 1000, 64, "sha512")
    .toString("hex");
  console.log("Validating password for: ", this._doc.username)
  console.log(hash)
  console.log(this._doc.hash)
  return this._doc.hash === hash;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
