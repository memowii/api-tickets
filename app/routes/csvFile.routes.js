"use strict";

const express = require('express');
const router = express.Router();
const csvFileController = require('../controllers/csvFile.controller');

router.post('/', csvFileController.upload, csvFileController.saveTicketsFromCsvFile);

module.exports = router;
