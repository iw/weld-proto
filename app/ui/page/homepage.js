
var util = require('util'),
    Page = require('./page').Page,
    Template = require('./template').Template,
    HomeModule = require('../module/homemodule').HomeModule;

var HomePage = function () {
  HomePage.super_.call(this);
}

util.inherits(HomePage, Page);

HomePage.prototype.initialize = function () {
  this.addModule(new HomeModule());
}

HomePage.prototype.getTemplate = function () {
  return new Template('index');
}

exports.HomePage = HomePage;