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
  })
})

// Sign-in
app.post('/signin', function(request, response) {
  pg.connect(connectionString, function(err, client, done) {
    client.query('SELECT * FROM api_user WHERE email=$1',
    [request.body.email],
    function(err, results) {
      if (results.rows.length > 0) {
        if (bcrypt.compareSync(request.body.password, results.rows[0].password_hash)) {
          // user is authenticated
          // put the user's id on the cookie.
          // {signed: true} scrambles the id, instead of storing as plaintext
          response.cookie('userID', results.rows[0].id, { signed: true })
          response.send(true)
        } else {
          // pw did not match
          response.send(false)
        }
      } else {
        // No email found
        response.send(false)
      }
    })
  })
})

// Get all users
app.get('/users', function(request, response) {
  pg.connect(connectionString, function(err, client, done) {
    client.query('SELECT * FROM api_user',
    function(err, results) {
      if ('ERROR MAKING QUERY:',err)
      console.log(err)
      done()
      response.send(results.rows)
    }) // client.query
  }) // pg.connect
}) // app.get

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
