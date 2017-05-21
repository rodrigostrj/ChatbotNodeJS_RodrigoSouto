var securityModule = require(__base + '/modules/module-security');
var request        = require("request");

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
                    //sendMessage(event);
                    console.log("Teste " + Date());

                }
            });
        });

        return res.status(200);
    });
}


function sendMessage(event) 
{
  let sender = event.sender.id;
  let text = event.message.text;

  request
  (
    {
        url: 'https://graph.facebook.com/v2.9/me/messages',
        qs: {access_token: "EAAY0AfpFpGEBANcWiiRmC3PSXZAwa1FvtN8p81Ls3KIXlX68qPhb43PqQFFpFmThcREcRrNk169TBojRtQiTU7SYZBDNGcrynvZBwvgKel9FzPZAlVWKr9H6N5BbU3OtHA139IbG8eMkvHyLKGDbTbUxUFqrZA3HMFQ9FUocwZBAZDZD"},
        method: 'POST',
        json: { recipient: {id: sender}, message: {text: text}}
    }
    ,
    function (error, response)
        {
        if (error)
        {
            console.log('Error sending message: ', error);
        }
        else if (response.body.error)
        {
            console.log('Error: ', response.body.error);
        }
    }
  );
}

