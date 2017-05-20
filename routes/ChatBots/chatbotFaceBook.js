var securityModule = require(__base + '/modules/module-security');

module.exports = function(app)
{
    app.get("/webhook/facebook/", securityModule.ensureAuthorizedFacebook, function(req, res)
    {
        var facebookReturnValue = req.query['hub.challenge'];
         return res.status(200).send(facebookReturnValue);
    });
}





