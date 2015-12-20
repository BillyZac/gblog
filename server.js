var express = require('express')
var app = express()
var pg = require('pg')
var connectionString = 'postgres://localhost/gblog'

//======== Posts ========
//Create

//Read
app.get('/posts', function(request, response) {
  pg.connect(connectionString, function(err, client, done) {
    client.query('SELECT * FROM post', function(err, results) {
      if (err)
        console.log(err)
      done() // What does this do?
      response.json(results)
    })
  })
})

//Update
//Delete

app.listen(8080, function() {
  console.log('Listening on 8080')
})
