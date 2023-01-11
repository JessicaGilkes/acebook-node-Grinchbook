const express = require("express");
const router = express.Router();

const FriendsController = require("../controllers/friends");

router.get("/", FriendsController.Index);
router.post("/unfriend", FriendsController.Unfriend);
router.post("/follow", FriendsController.Follow);

module.exports = router;
