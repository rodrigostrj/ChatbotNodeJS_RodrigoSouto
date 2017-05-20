var securityModule = require(__base + '/modules/module-security');

module.exports = function(app)
{
    app.get("/webhook/facebook/", securityModule.ensureAuthorizedFacebook, function(req, res)
    {
         return res.status(200).json({message: 'OK'});
    });
}





