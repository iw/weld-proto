  
var connect = require('connect'),
    escort = require('escort'),
    HomePage = require('./homepage').HomePage;

function renderHome(req, res) {
  new HomePage().render(req, res);
}

connect(
  escort(function (routes) {
    routes.get("/", renderHome);
  })
).listen(8000);

console.log('Server running at http://127.0.0.1:8000/');
