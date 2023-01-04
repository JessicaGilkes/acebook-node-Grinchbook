const HomeController = {
  Index: (req, res) => {
    console.log(req.session.user)
    const username = req.session.user? req.session.user.username : "valued customer";
    res.render("home/index", { title: "Acebook", username });
  },
};

module.exports = HomeController;
