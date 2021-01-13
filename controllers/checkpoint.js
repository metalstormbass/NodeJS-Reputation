const cpModel = require('../model/cpmodel');

module.exports = {
    cpLogin: function (req, res) {
        cpModel.cpLogin(req.body.apiKey, function (err, token) {
            if (err) res.render('error', { error: err });
            else {
                cpModel.cpPost(req.body.apiKey, req.body.targetUrl, token, function (err, reputation) {
                    if (err) res.render('error', { error: err });
                    res.render('index', { status: reputation.response[0] });
                });
            }
        });
    }
}