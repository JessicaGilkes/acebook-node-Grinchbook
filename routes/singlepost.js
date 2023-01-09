const express = require("express");
const router = express.Router();

const SinglePostController = require("../controllers/singlepost")

router.get("/", SinglePostController.Index)

module.exports = router;