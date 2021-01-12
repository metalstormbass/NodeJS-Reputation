const express = require('express');
const router = express.Router();
const request = require('node-fetch');
const { json } = require('body-parser');

// Variables

var loginUrlBase = 'https://rep.checkpoint.com/rep-auth/service/v1.0/request';

// Login Function

function cpLogin(apiKey) {
    var authToken;
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
        .then(text => authToken = text);
         return(authToken);
}

// Post Function

function cpPost(apiKey, authToken, targetUrl) {
    // console.log(targetUrl)
    var headers = {
        'Client-Key': apiKey,
        'token': authToken
    };
    var inputBody = {
            request: [{
                resource: targetUrl
            }]       
      };
    var body = JSON.stringify(inputBody);
    var urlBase = 'https://rep.checkpoint.com/url-rep/service/v2.0/query?resource=' + targetUrl;
    request(urlBase,
        {
            method: 'POST',
            headers: headers,
            body: body
        })
        //.then(res => console.log(res))
        //.then(json => output = json)
        //.then(json => console.log(output))
        return (json.body);     

}



// Get home page
router.get('/', function (req, res, next) {
    res.render('index', { status: null, error: null });
});

// Parse User Input
router.post('/', async (req, res) => {
    // Login to CP Reputation
    var apiKey = req.body.apiKey;
    var targetUrl = req.body.targetUrl;
    // Call async function
    var authToken = await cpLogin(apiKey); 
    await console.log(authToken); 
    var output = await cpPost(apiKey, authToken, targetUrl); 
    res.render('index', { status: output, error: null });
    //console.log(output)
});  

module.exports = router;

