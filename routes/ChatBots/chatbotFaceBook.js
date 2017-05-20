var securityModule = require(__base + '/modules/module-security');

module.exports = function(app)
{
    app.get("/api/facebook/", securityModule.ensureAuthorized, function(req, res)
    {
         return res.status(200).json({message: 'OK'});
    });
}





