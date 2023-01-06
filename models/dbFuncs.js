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

module.exports = { dropUsers };
