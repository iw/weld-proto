
var redis = require('redis'),
    repo = redis.createClient();

var HomeModule = function () { }

repo.on('error', function (err) {
    console.error('Problem obtaining the Pinboard resources:', err);
});

HomeModule.prototype.getName = function () {
  return 'home';
}

HomeModule.prototype.getContent = function (req) {
  var content = {};
  content.title = 'Welded node';

  // Include the bookmarks
  var tag = 'pinboard:tag:node.js';
  repo.zrevrange(tag, 0, 15, function (err, resources) {
    if (err) {
      console.error('Unable to obtain', tag, err);
    } else {
      var bookmarks = [];
      resources.forEach(function (bookmark) {
        var result = /^([^\s]+) (.+)$/.exec(bookmark);
        var title = result[2];
        var resource = result[1];

        bookmarks.push({
          title: title,
          resource: resource
        });
      });

      content.bookmarks = bookmarks;
    }
  });

  return content;
}

exports.HomeModule = HomeModule;