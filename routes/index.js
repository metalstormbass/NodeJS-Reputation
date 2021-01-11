const express = require('express');
const router = express.Router();
const request = require('node-fetch');

// Variables

var loginUrlBase = 'https://rep.checkpoint.com/rep-auth/service/v1.0/request';
var apiKey;
var urlBase = 'https://rep.checkpoint.com/url-rep/service/v2.0/query?resource=';

// Login Function

function cpLogin(apiKey) {

    var headers = {
        'Client-Key': apiKey,
    };
    //console.log(headers)
    request(loginUrlBase,
        {
            method: 'GET',
            headers: headers
        })
        .then(res => res.text())
        .then(text => authToken = text)
      
        console.log(authToken)
        return authToken;
}

// Get home page
router.get('/', function (req, res, next) {
    res.render('index', { status: null, error: null });
});

router.post('/', function (req, res) {
    // Login to CP Reputation
    var apiKey = req.body.apiKey;
    console.log('testing flow 1');
    var authToken = cpLogin(apiKey);
    console.log(authToken)
    res.render('index', { status: apiKey, error: null });

    // Assemble Request
   // let targetUrl = req.body.targetUrl;
    //let apiUrl = urlBase + '${targetUrl}'
    //Parse response from Post and display it to webpage
});  

module.exports = router;

