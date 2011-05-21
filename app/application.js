  
var connect = require('connect'),
    escort = require('escort'),
    path = require('path'),
    static = require('node-static'),
    HomePage = require('./ui/page/homepage').HomePage;

var stylesheets = new static.Server(path.join(__dirname, '..', 'public', 'css'));
var images = new static.Server(path.join(__dirname, '..', 'public', 'image'));

function renderHome(req, res) {
  new HomePage().render(req, res);
}

function serveStylesheet(req, res) {
  stylesheets.serveFile('/style.css', 200, {}, req, res).addListener('error', function (err) {
    console.error('Error serving ' + req.url + ' - ' + err.message);
  });
}

function serveImage(req, res, params) {
  images.serveFile('/' + params.image, 200, {}, req, res).addListener('error', function (err) {
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
    routes.get('/css/style.css', serveStylesheet);
    routes.get('image', '/image/{image:string}', serveImage);
    routes.get('/favicon.ico', serveEmptyContent);
  })
);
server.listen(8000);

console.log('Server running at http://%s:%s/', server.address().address,
                                               server.address().port);
