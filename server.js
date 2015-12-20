var express = require('express')
var pg = require('pg')
var bodyParser = require('body-parser')
var api = require('./api')
var app = express()
var connectionString = 'postgres://localhost/gblog'

app.use(bodyParser.urlencoded({ extended: false }))

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
