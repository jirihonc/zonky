var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express');

var app = express();

 
app.use(express.static('dist'));
app.use(express.static('node_modules'));

app.get('abc', function (req, res) {
  res.send('Hello World');
})
 
// app.listen(process.env.PORT || 5000)



var privateKey = fs.readFileSync( 'privkey.pem' , 'utf8');
var certificate = fs.readFileSync( 'cert.pem' , 'utf8');

/*
https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(process.env.PORT || 5000);
  */

var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(process.env.PORT || 5000);
httpsServer.listen(5443);