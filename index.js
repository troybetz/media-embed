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
 * Embed some `url` within a `parent`. 
 *
 * Works with every media provider listed at http://noembed.com/, though
 * the formatting for things like tweets & gists are a little wonky.
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
  var noembedUrl = 'https://noembed.com/embed?url=' + url + '&nowrap=on';
  jsonp(noembedUrl, function(err, data) {
    if (err) cb(err);
    if (!data.html) cb(new Error('unable to embed ' + url));
    cb(null, data.html);
  });
}

/**
 * Append `html` to `parent` element
 *
 * @param {String} html
 * @param {Object} parent
 */

function embed(html, parent) {
  var embed = domify(html);
  parent.appendChild(embed);
}
