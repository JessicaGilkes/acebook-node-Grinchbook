const express = require("express");
const router = express.Router();

const ResetController = require("../controllers/resetdb");

router.get("/", ResetController.Reset);

module.exports = router;