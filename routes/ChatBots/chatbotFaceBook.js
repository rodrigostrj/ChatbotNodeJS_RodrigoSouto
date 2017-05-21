var securityModule = require(__base + '/modules/module-security');
var config = require(__base +'/config/config-general');
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

        return res.status(200).end();
    });
}


function sendMessage(event) 
{
    //TEXT
    var sender = event.sender.id;
    var text = event.message.text;
    var textResponse = getResponseText(text);

    sendMessageText(sender, textResponse);

    //TODO - Tratar Attachment

}

function sendMessageText(senderId, text)
{
  request
  (
    {
        url: config.facebook_app_path,
        qs: {access_token: config.facebook_app_access_token},
        method: 'POST',
        json: { recipient: {id: senderId}, message: {text: text}}
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

function getResponseText(text)
{
    var textReturn = "Não entendi. Pode repetir por favor? Por enquanto eu repondo apenas a 'Ola, Tudo bem? e Qual é o seu nome?'";
    switch (text)
    {
        case "Ola":
             textReturn = "Tudo bem?";
            break;  
        case "Tudo bem?":
             textReturn = "Que bom!";
            break;
        case "Qual é o seu nome?":
             textReturn = "Eu sou o Jarvis e você?";
            break;                          
        default:
            break;
    }

    return textReturn;
}
