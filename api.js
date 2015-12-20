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
  } // posts
}
