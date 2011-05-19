
var redis = require('redis'),
    repo = redis.createClient(),
    jsdom = require('jsdom'),
    URI = require('uri-js').URI,
    path = require('path');

var DELAY_PERIOD = 1000 * 60 * 60;

repo.on('error', function (err) {
    console.log('Problem obtaining the Pinboard resources:', err);
});

function parseDate(s) {
  var result = /^(\d{4})\.(\d{2})\.(\d{2})\s+(?:\d{2}:\d{2}:\d{2})$/.exec(s);
  var year = parseInt(result[1]);
  var month = parseInt(result[2]) - 1;
  var day = parseInt(result[3]);

  return new Date(year, month, day);
}

// Download the pinboard pages:
//
// http://pinboard.in/t:node/
// http://pinboard.in/t:nodejs/
// http://pinboard.in/t:node.js/
//
function obtainResources(repo) {
  repo.smembers('tags', function (err, tags) {
    tags.forEach(function (tag) {
      var pinboard = 'http://pinboard.in/t:' + tag + '/';

      jsdom.env(pinboard, [
        path.join(__dirname, 'public', 'scripts', 'jquery-1.5.2.min.js')
      ], function (errors, window) {
        if (errors) {
          console.warn('Unable to obtain the pinboard:', errors);
        } else {
          window.$('a[class="bookmark_title "]').each(function () {
            var bookmark = window.$(this);
            
            var resource = URI.normalize(bookmark.attr('href'));
            var title = bookmark.html();
            // <a class="when" href="/u:.../b:..."
            // title="2011.05.11 &nbsp; 14:44:49">1 hour ago</a>
            var when = bookmark.nextAll('a[class="when"]').attr('title');
            var bookmarked = when.replace('&nbsp;', '');
            var d = parseDate(bookmarked);

            var k = 'pinboard:tag:' + tag + ':' + d.getTime();
            var v = resource + ' ' + title.trim();

            console.log('Adding', v, 'to', k);
            repo.sadd(k, v);
          });
        }
      });
    });
  });
}

// setInterval(obtainResources, DELAY_PERIOD, repo);
obtainResources(repo);
