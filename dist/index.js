"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/**
 * Module dependencies
 */

var jsonp = _interopRequire(require("jsonp"));

var domify = _interopRequire(require("domify"));

/**
 * Return embed data for `url`.
 *
 * Works with every media provider listed at http://noembed.com/, though
 * the formatting for things like tweets & gists are a little wonky.
 *
 * @param {String} url to be embedded
 * @param {Function} cb
 */

module.exports = function (url, cb) {
  if (typeof url !== "string") {
    throw new Error("valid url required for embedding");
  }

  getEmbedData(url, function (err, data) {
    if (err) return cb(err);
    cb(null, domify(data.html), data);
  });
};

/**
 * Retrieve embed data for a `url`
 *
 * @param {String} url
 * @param {Function} cb
 */

var getEmbedData = function (url, cb) {
  var noembedUrl = "https://noembed.com/embed?url=" + url + "&nowrap=on";

  jsonp(noembedUrl, function (err, data) {
    if (err) {
      return cb(err);
    }

    if (!data.html) {
      return cb(new Error("unable to embed " + url));
    }

    cb(null, data);
  });
};