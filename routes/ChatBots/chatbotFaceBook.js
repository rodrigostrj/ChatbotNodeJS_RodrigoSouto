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

       req.body.entry.forEach((entry) =>
       {
            entry.messaging.forEach((event) => 
            {
                if (event.message && event.message.text)
                {
                    console.log("Texto" + event.message.text);
                }
            });
        });

        return res.status(200);
    });
}





