
var Page = function () {
  this.modules = [];
  this.initialize();
}

Page.prototype.addModule = function (module) {
  this.modules.push(module);
}

Page.prototype.render = function (req, res) {
  var template = this.getTemplate();

  var content = {};
  this.modules.forEach(function (module) {
    content[module.getName()] = module.getContent(req);
  });

  template.render(content, res);
}

Page.prototype.initialize = function () {}

Page.prototype.getTemplate = function () {
  throw new Error('This is required to be specialized.');
}

exports.Page = Page;