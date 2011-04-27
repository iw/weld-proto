
var connect = require('connect'),
    escort  = require('escort'),
    jsdom   = require('jsdom'),
    weld    = require('weld');

function renderHome(req, res) {
  jsdom.env({
    scripts : [
      './public/scripts/jquery-1.5.2.min.js',
      require('weld').filepath
    ],
    html : './public/index.html'
  }, function(errors, window) {
    var $ = window.jQuery;
    // window.weld($('title')[0], 'Welded node', { debug : true });
    window.weld($('title')[0], 'Welded node');

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"\n');
    res.write('   "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">\n');
    res.write('<html xmlns="http://www.w3.org/1999/xhtml">\n');
    res.write('<head>\n');
    res.write($('head').html());
    res.write('\n</head>\n<body>\n');
    res.write($('body').html());
    res.end('\n</body>\n</html>');
  });
}

connect(
  escort(function(routes) {
    routes.get("/", renderHome);
  })
).listen(8000);

console.log('Server running at http://127.0.0.1:8000/');
