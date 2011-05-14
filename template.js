  
var path = require('path'),
    jsdom = require('jsdom'),
    weld = require('weld'),
    _ = require('underscore');

var Template = function (name) {
  this.template = path.join(__dirname, 'public', name);
}

Template.prototype.render = function (content, res) {
  var self = this;

  jsdom.env({
    scripts: [
      path.join(__dirname, 'public', 'scripts', 'jquery-1.5.2.min.js'),
      require('weld').filepath
    ],
    html: this.template,
  }, function (errors, window) {
    var $ = window.jQuery;
    self.bind(window, $, content);
    self.write($, res);
  });
}

Template.prototype.bind = function(window, $, content) {
  _(content).each(function (selectorAndValues, aspect) {
    _(selectorAndValues).each(function (values, selector) {
      window.weld($(selector)[0], values);
    });
  });
}

Template.prototype.write = function($, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"\n');
  res.write('   "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">\n');
  res.write('<html xmlns="http://www.w3.org/1999/xhtml">\n');
  res.write('<head>\n');
  res.write($('head').html());
  res.write('\n</head>\n<body>\n');
  res.write($('body').html());
  res.end('\n</body>\n</html>');
}

exports.Template = Template;