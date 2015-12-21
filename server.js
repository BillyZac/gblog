var express = require('express')
var pg = require('pg')
var bodyParser = require('body-parser')
var api = require('./api')
var timestamp = require('./timestamp')
var bcrypt = require('bcrypt')
var cookieParser = require('cookie-parser')

var app = express()
var connectionString = 'postgres://localhost/gblog'

require('dotenv').load() // what does this do?

app.use(bodyParser.json()) // what does this do?
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(process.env.SECRET))

// Every request that comes in gets timestamped
app.use(timestamp);

//======== Signup ========
app.post('/signup', function(request, response) {
  // I'm taking the pw in the request body.
  // It should be in the body.params, but I can't figure out how to put in there on the POST
  var hash = bcrypt.hashSync(request.body.password, 8)
  console.log('PW:', request.body.password, 'PW hashed:', hash)
  pg.connect(connectionString, function(err, client, done) {
    if (err)
      console.log('ERROR CONNECTING TO DATABASE:', err)
    client.query('INSERT INTO api_user VALUES (default, $1, $2)',
    [request.body.email,
     hash],
    function(err, results) {
      if ('ERROR MAKING QUERY:',err)
        console.log(err)
      done()
      response.send(results)
    })

      // HERE IS THE CODE FOR THE GET ROUTE:
    // client.query('SELECT * FROM api_user',
    // function(err, results) {
    //   if ('ERROR MAKING QUERY:',err)
    //     console.log(err)
    //   done()
    //   response.send(results)
    // })
  })
})

//======== Posts ========
// Read all posts
app.get('/posts', function(request, response) {
  api.posts.read(response)
})

//Create a post
app.post('/posts', function(request, response) {
  api.post.create(request, response)
})

// Read one post
app.get('/posts/:id', function(request, response) {
  api.post.read(request, response)
})

// Update
app.put('/posts/:id', function(request, response) {
  api.post.update(request, response)
})

//Delete
app.delete('/posts/:id', function(request, response) {
  api.post.delete(request, response)
})

app.listen(8080, function() {
  console.log('Listening on 8080')
})
