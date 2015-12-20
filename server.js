var express = require('express')
var app = express()
var pg = require('pg')
var connectionString = 'postgres://localhost/gblog'

//======== Posts ========
//Create
app.post('/posts/new', function(request, response) {
  pg.connect(connectionString, function(err, client, done) {
    client.query('INSERT INTO post VALUES (default, $1, $2, $3)',
    ['This is a title.',
     'This is a body.',
     'This is an author.'],
    function(err, results) {
      done()
      if (err){
        console.log('There was an error with the post query:', err)
        return
      }
      response.json(results)
    })
  })
})

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
