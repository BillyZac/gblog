var express = require('express')
var pg = require('pg')
var bodyParser = require('body-parser')

var app = express()
var connectionString = 'postgres://localhost/gblog'

app.use(bodyParser.urlencoded({ extended: false }))

//======== Posts ========
//Create
app.post('/posts', function(request, response) {
  console.log(request.body)
  var creationTime = Date.now()
  pg.connect(connectionString, function(err, client, done) {
    client.query('INSERT INTO post VALUES (default, $1, $2, $3, $4)',
    [request.body.title,
     request.body.body,
     request.body.author,
     creationTime],
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

//Read all
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

// Read one post
app.get('/posts/:id', function(request, response) {
  pg.connect(
    connectionString,
    function(err, client, done) {
      client.query(
        'SELECT * FROM post WHERE id=$1',
        [request.params.id],
        function(err, results) {
          done()
          response.json(results)
        })
    })
})

//Update

//Delete

app.listen(8080, function() {
  console.log('Listening on 8080')
})
