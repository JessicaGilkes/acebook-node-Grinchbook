const express = require("express");
const router = express.Router();

const SinglePostController = require("../controllers/singlepost")

router.get("/", SinglePostController.Index)
// router.get("#", SinglePostController.Modal)

module.exports = router;