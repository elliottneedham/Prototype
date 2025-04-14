const express = require("express");
const router = express.Router();
const { getNoRData } = require("../controllers/getNoRData");

router.get("/", getNoRData);

module.exports = router;