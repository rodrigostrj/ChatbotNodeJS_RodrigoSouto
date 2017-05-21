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
                    sendMessage(event);
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
        qs: {access_token: "EAAY0AfpFpGEBAJxIgkuInQkoUC5vtAMSmHAcb3y8kwPMRZAZCXtNQlz5PAB2IPsOp3XzJQd5Tpb3hbbDwB5a68OFBZCtZAW2HF7KsBDjnG8Yeh6fwvwWiLMoyuHvgfhyAieR4msSAGsuggmYLFfZA2IDxL4925cbI4gRgdmHZCxAZDZD"},
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

