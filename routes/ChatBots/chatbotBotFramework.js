var securityModule = require(__base + '/modules/module-security');
var config = require(__base +'/config/config-general');
var builder = require('botbuilder');
var request        = require("request");

var webhookPath = "/webhook/botframework/";

module.exports = function(app)
{

    app.post(webhookPath, function(req,res)
    {
        // Create chat connector for communicating with the Bot Framework Service
        var connector = new builder.ChatConnector
        ({
            appId: "ec2790ea-bd71-4d37-8fce-a1bc08a6d44a",
            appPassword: "ugB5bfv4RwjfcZ2VhtOYCs9"
        });

        // Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
        var bot = new builder.UniversalBot
        (connector, function (session) 
        {
            session.send("You said: %s", session.message.text);
            console.log(session.message.text);
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
