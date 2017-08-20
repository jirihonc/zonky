var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express'),
    cors = require('cors');


var app = express();

app.use(cors());

/*
app.use( function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');    
  next();
});
*/

app.get('/version', function(req, res, next) {
  res.send('version: 0.1')
});

app.use(express.static('dist'));
app.use(express.static('node_modules'));


/*
app.listen(process.env.PORT || 5000);
console.log('Server running on 5000');
*/


var privateKey = fs.readFileSync( 'privkey.pem' , 'utf8');
var certificate = fs.readFileSync( 'cert.pem' , 'utf8');


// https.createServer({
    // key: privateKey,
    // cert: certificate
// }, app).listen(process.env.PORT || 5000);
  

var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(process.env.PORT || 5000);
httpsServer.listen(5443);

console.log('Server running on 5000 / 5443');
