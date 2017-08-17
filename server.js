var express = require('express')
var app = express()

 
app.use(express.static('dist'))
app.use(express.static('node_modules'))

app.get('abc', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)