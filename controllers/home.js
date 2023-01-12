const HomeController = {
  Index: (req, res) => {
    console.log(req.session.user);
    const username = req.session.user
      ? req.session.user.username
      : "valued customer";
    const profile_pic = req.session.user ? req.session.user.profile_pic : false;
    console.log("homepage", profile_pic);
    res.render("home/index", {
      profile_pic,
      title: "Acebook",
      username,
      loggedin: req.session.user,
    });
  },
};

module.exports = HomeController;
