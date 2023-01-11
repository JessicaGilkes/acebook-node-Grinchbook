const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.post("/new", CommentsController.Create);

module.exports = router;
