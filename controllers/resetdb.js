const User = require("../models/user");

const ResetController = {
    Reset: async (req,res) => {
        console.log("reseting");
       console.log( await User.deleteMany({  }));
       // const username = req.session.user? req.session.user.username : "valued customer";
       // res.render("home/index", { title: "Acebook", username, loggedin: req.session.user });
        res.redirect("/");
    }
}

module.exports = ResetController;
