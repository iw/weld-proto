  
var connect = require('connect'),
    escort = require('escort'),
    path = require('path'),
    static = require('node-static'),
    HomePage = require('./ui/page/homepage').HomePage;

var stylesheets = new static.Server(path.join(__dirname, '..', 'public', 'css'));
var images = new static.Server(path.join(__dirname, '..', 'public', 'image'));
var scripts = new static.Server(path.join(__dirname, '..', 'public', 'script'));

function renderHome(req, res) {
  new HomePage().render(req, res);
}

function serveStylesheet(req, res, params) {
  stylesheets.serveFile('/' + params.stylesheet, 200, {}, req, res).addListener('error', function (err) {
    console.error('Error serving ' + req.url + ' - ' + err.message);
  });
}

function serveImage(req, res, params) {
  images.serveFile('/' + params.image, 200, {}, req, res).addListener('error', function (err) {
    console.error('Error serving ' + req.url + ' - ' + err.message);
  });
}

function serveScript(req, res, params) {
  scripts.serveFile('/' + params.script, 200, {}, req, res).addListener('error', function (err) {
    console.error('Error serving ' + req.url + ' - ' + err.message);
  });
}

function serveEmptyContent(req, res) {
  res.writeHead(204);
  res.end();
}

var server = connect(
  escort(function (routes) {
    routes.get('/', renderHome);
    routes.get('css', '/css/{stylesheet:string}', serveStylesheet);
    routes.get('image', '/image/{image:string}', serveImage);
    routes.get('script', '/script/{script:string}', serveScript);
    routes.get('/favicon.ico', serveEmptyContent);
  })
);
server.listen(8000);

console.log('Server running at http://%s:%s/', server.address().address,
                                               server.address().port);
