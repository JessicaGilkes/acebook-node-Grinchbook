const express = require("express");
const router = express.Router();

const SinglePostController = require("../controllers/singlepost")

router.get("/", SinglePostController.Index)
router.post("/like", SinglePostController.Like)
router.post("/unlike", SinglePostController.Unlike)
// router.get("#", SinglePostController.Modal)

module.exports = router;