var app = require('./config/config-middlewhere')();
var config = require('./config/config-general');

// Set Variables
var DEVPORT = config.dev_port;


process.on('uncaughtException', function(err)
{
    console.log(err);
});

// Start server
app.listen(process.env.PORT || DEVPORT, function()
    {
        console.log('Server running on PORT %d', DEVPORT);
    }
)

