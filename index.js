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
 * Return embed ready html for a `url`. 
 *
 * Works with every media provider listed at http://noembed.com/, though
 * the formatting for things like tweets & gists are a little wonky.
 *
 * @param {String} url to be embedded
 * @param {Function} cb
 */

function mediaEmbed(url, cb) {
  if (typeof url != 'string') throw new Error('valid url required for embedding');

  getEmbedHTML(url, function(err, html) {
    if (err) return cb(err);
    cb(null, domify(html));
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
    if (err) return cb(err);
    if (!data.html) return cb(new Error('unable to embed ' + url));
    cb(null, data.html);
  });
}
