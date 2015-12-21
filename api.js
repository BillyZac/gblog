var pg = require('pg')
var connectionString = 'postgres://localhost/gblog'

module.exports = {
  posts: {
    read: function(response) {
      pg.connect(connectionString, function(err, client, done) {
        client.query('SELECT * FROM post', function(err, results) {
          if (err)
          console.log(err)
          done()
          response.json(results)
        }) // client.query
      }) // pg.connect
    } // read
  }, // posts
  post: {
    create: function(request, response) {
      // console.log('THE BODEEEEEEEE========!', request)
      // var creationTime = Date.now()
      pg.connect(connectionString, function(err, client, done) {
          client.query('INSERT INTO post VALUES (default, $1, $2, $3, $4)',
            [request.body.title,
             request.body.body,
             request.body.author,
             request.body.creationTime],
            function(err, results) {
              if (err)
                console.log(err)
              done()
              response.json(results)
            }) // client.query
        }) // pg.connect
    }, // create
    read: function(request, response) {
      pg.connect(
        connectionString,
        function(err, client, done) {
          client.query(
            'SELECT * FROM post WHERE id=$1',
            [request.params.id],
            function(err, results) {
              done()
              response.json(results)
            }) // client.query
        }) // pg.connect
    }, // read
    update: function(request, response) {
      pg.connect(
        connectionString,
        function(err, client, done) {
          if (err)
            console.log('Error on pg.connect:', err)
          client.query(
            'UPDATE post SET title=$2, body=$3 WHERE id=$1',
            [request.params.id,
            request.body.title,
            request.body.body],
            function(err, results) {
              if (err)
                console.log('Error on client.query:', err)
              done()
              response.json(results)
            }) // client.query
        }) // pg.connect
    }, // update
    delete: function(request, response) {
      pg.connect(connectionString, function(err, client, done) {
        client.query(
          "DELETE FROM post WHERE id=$1",
          [request.params.id],
          function(err, results) {
            if (err)
              console.log(err)
            done()
            response.json(results)
          }) // client.query
      }) // pg.connect
    } // delete
  } // post

} // module.exports
