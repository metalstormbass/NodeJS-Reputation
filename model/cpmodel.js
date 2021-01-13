const https = require('https');

var cpModel= function (data) {
    this.api = data.api;
    this.check = data.check;
};

cpModel.cpLogin = function (apiKey, callback) {
      var options = {
        method: 'GET',
        headers: { 'Client-Key': apiKey },
        host: "rep.checkpoint.com",
        path: "/rep-auth/service/v1.0/request"
    };

    const req = https.request(options, (res) => {
        res.on('data', (d) => {
            callback(null, d);
        });
    });

    req.on('error', (e) => {
        callback(e);
    });

    req.end();
}

cpModel.cpPost = function (apiKey, targetUrl, token, callback) {

    const data = JSON.stringify({
        request: [{ 'resource': targetUrl }]
    });

    var options = {
        method: 'POST',
        headers: { 'Client-Key': apiKey, 'token': token, 'content-type': 'application/json' },
        host: 'rep.checkpoint.com',
        body: { 'request': [{ 'resource': targetUrl }] },
        path: '/url-rep/service/v2.0/query?resource=' + targetUrl
    };

    const req = https.request(options, (res) => {
        let info = '';

        console.log('Status Code:', res.statusCode);

        res.on('data', (chunk) => {
            info += chunk;
        });

        res.on('end', () => {
            callback(null, JSON.parse(info));
        });

    }).on("error", (err) => {
        callback(err);
    });

    req.write(data);
    req.end();

}

module.exports = cpModel;
