
var HomeModule = function () { }

HomeModule.prototype.getName = function () {
  return 'home';
}

HomeModule.prototype.getContent = function (req) {
  return { 'title': 'Welded node' };
}

exports.HomeModule = HomeModule;