
var redis = require('redis'),
    repo = redis.createClient();

repo.on('error', function (err) {
    console.log('Problem bootstrapping the Pinboard tags:', err);
});

//
// http://pinboard.in/t:node/
// http://pinboard.in/t:nodejs/
// http://pinboard.in/t:node.js/
//
repo.sadd('tags', 'node');
repo.sadd('tags', 'nodejs');
repo.sadd('tags', 'node.js');
