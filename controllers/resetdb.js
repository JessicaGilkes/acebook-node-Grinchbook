const User = require("../models/user");

const ResetController = {
  Reset: async (req, res) => {
    console.log("reseting db");
    await User.deleteMany({});
    res.redirect("/");
  },
};

module.exports = ResetController;
