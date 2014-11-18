/**
 * Module dependencies
 */

var jsonp = require('jsonp');
var domify = require('domify');

/**
 * Expose `mediaEmbed`
 */

module.exports = mediaEmbed;

/**
 * Embed a `url` within a `parent` element
 *
 * @param {String} url
 * @param {Object} [parent]
 */


function mediaEmbed(url, parent) {
  if (!url) throw new Error('url required for embedding');

  if (!parent) {
    parent = document.body;
  }

  getEmbedHTML(url, function(err, html) {
    if (err) throw err;
    embed(html, parent);
  });
}

/**
 * Retrieve embed `html` for a `url`
 *
 * @param {String} url
 * @param {Function} cb
 */

function getEmbedHTML(url, cb) {
  var url = 'https://noembed.com/embed?url=' + url + '&nowrap=on';
  jsonp(url, function(err, data) {
    if (err) cb(err);
    if (!data.html) cb(new Error('media not supported'));
    cb(null, data.html);
  });
}

/**
 * Append `html` to `parent`
 *
 * @param {String} html
 * @param {Object} parent
 */

function embed(html, parent) {
  var embed = domify(html);
  parent.appendChild(embed);
}
