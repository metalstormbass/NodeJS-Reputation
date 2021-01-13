const express = require('express');
const router = express.Router();
const https = require('https');
const { json } = require('body-parser');
const checkpointController = require('../controllers/checkpoint');


// Get home page
router.get('/', function (req, res, next) {
    res.render('index', { status: null, error: null });
});

// Parse User Input
//router.post('/', function (req, res) {
//    checkpointController.cpLogin
//});

router.post('/', checkpointController.cpLogin);

module.exports = router;

