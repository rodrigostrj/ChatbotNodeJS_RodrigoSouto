var securityModule = require('../modules/module-security');

module.exports = function(app)
{
    app.get("/api/teste/", securityModule.ensureAuthorized, function(req, res)
    {
         res.status(200).json({message: 'OK'});
         return;
    });
}
