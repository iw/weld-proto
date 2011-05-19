  
var path = require('path'),
    jsdom = require('jsdom'),
    util = require('util');

var TEMPLATE_EXTENSION = '.html';
var WELDER_EXTENSION   = '.welder.js';

var Template = function (name) {
  this.template = path.join(__dirname, 'public', name + TEMPLATE_EXTENSION);
  var welderPath = path.join(__dirname, 'public', name + WELDER_EXTENSION);

  if (!path.existsSync(this.template)) {
    // Handle exception
    util.debug('Template is missing:', this.template);
  }

  if (!path.existsSync(welderPath)) {
    // Handle exception
    util.debug('Welder is missing:', welderPath);
  }

  this.welder = require(welderPath);
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
  this.welder.bind(window, $, content);
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