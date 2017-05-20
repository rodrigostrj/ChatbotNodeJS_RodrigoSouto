var securityModule = require(__base + '/modules/module-security');

var webhookPath = "/webhook/facebook/";

module.exports = function(app)
{
    app.get(webhookPath, securityModule.ensureAuthorizedFacebook, function(req, res)
    {
        var facebookReturnValue = req.query['hub.challenge'];
         return res.status(200).send(facebookReturnValue);
    });

    app.post(webhookPath, function(req,res)
    {
        var data = req.body;
        if(!(data && data.object == "page"))   
        {
            return res.status(400).send("object 'page' not found");
        }

        data.entry.forEach(function(entry)
        {
            var pageID = entry.id;
            var eventTime = entry.time;

            data.messaging.forEach(function(event)
            {
                if(event.message)
                {
                    console.log(event.message);
                }
            });
        });

        return res.status(200);

    });
}





