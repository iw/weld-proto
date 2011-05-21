
var weld = require('weld');

function bindHome(window, $, content) {
  // bind title
  if ($('title')) {
    window.weld($('title')[0], content.title);
  }

  // bind bookmarks
  if ($('.bookmark')) {
    window.weld($('.bookmark')[0], content.bookmarks, {
      alias: {
        'title': 'bookmarktitle',
        'resource': 'bookmarkresource'
      },

      map: function (parent, element, key, value) {
        if (key === 'resource') {
          element.setAttribute('href', value);
        }

        return true;
      }
    });
  }
}

function bind(window, $, content) {
  bindHome(window, $, content.home);
}

exports.bind = bind;