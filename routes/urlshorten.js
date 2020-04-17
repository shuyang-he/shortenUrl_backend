const express = require('express');
const {getAll, postShortenUrl} = require('../controllers/urlShortenController');

const router = express.Router();

router.get("/", getAll);

router.post("/", postShortenUrl);

module.exports = router;
