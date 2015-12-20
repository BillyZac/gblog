var express = require('express')
var app = express()

app.get('/', function(request, response) {
  response.json({
    "hello": "world"
  })
})

app.listen(8080, function() {
  console.log('Listening on 8080')
})
