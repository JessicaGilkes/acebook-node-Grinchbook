const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook", loggedin: req.session.user });
  },
};

module.exports = HomeController;
