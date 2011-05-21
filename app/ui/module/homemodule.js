
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
  var today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  
  var tag = 'pinboard:tag:node.js:' + today.getTime();
  repo.smembers(tag, function (err, resources) {
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