var config = require('../config/config-general');

var SecurityModule = {};
module.exports = SecurityModule;

SecurityModule.ensureAuthorized = function ensureAuthorized(req, res, next)
{
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.params.token || req.headers['x-access-token'];

    // decode token
    if (token) 
    {
            if (!validatePassword(token))
            {
                return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });		
            }
            
            return next();
    } 

    return res.status(403).send
    (
        { 
        success: false, 
        message: 'No token provided.'
        }
    );  
}


function validatePassword(password)
{
    return password == config.security_token;
}