/**
 * Module dependencies
 */

import jsonp from 'jsonp';
import domify from 'domify';

/**
 * Return embed data for `url`.
 *
 * Works with every media provider listed at http://noembed.com/, though
 * the formatting for things like tweets & gists are a little wonky.
 *
 * @param {String} url to be embedded
 * @param {Function} cb
 */

export default (url, cb) => {
  if (typeof url !== 'string') {
    return cb(new Error('valid url required for embedding'));
  }

  getEmbedData(url, (err, data) => {
    if (err) {
      return cb(err);
    }
    cb(null, domify(data.html), data);
  });
};

/**
 * Retrieve embed data for a `url`
 *
 * @param {String} url
 * @param {Function} cb
 */

const getEmbedData = (url, cb) => {
  const noembedUrl = `https://noembed.com/embed?url=${url}&nowrap=on`;

  jsonp(noembedUrl, (err, data) => {
    if (err) {
      return cb(err);
    }

    if (!data.html) {
      return cb(new Error('unable to embed ' + url));
    }

    cb(null, data);
  });
};
