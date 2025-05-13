const express = require("express");
const router = express.Router();
const getNoRDataFromCSV = require("../controllers/getNoRDataFromCSV");

router.get("/", getNoRDataFromCSV);

module.exports = router;