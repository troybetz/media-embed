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
 * @param {Function} callback
 */

export default (url, callback) => {
  if (typeof url !== 'string') {
    return callback(new Error('valid url required for embedding'));
  }

  getEmbedData(url, (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, domify(data.html), data);
  });
};

/**
 * Retrieve embed data for a `url`
 *
 * @param {String} url
 * @param {Function} callback
 */

const getEmbedData = (url, callback) => {
  const noembedUrl = `https://noembed.com/embed?url=${url}&nowrap=on`;

  jsonp(noembedUrl, (err, data) => {
    if (err) {
      return callback(err);
    }

    if (!data.html) {
      return callback(new Error('unable to embed ' + url));
    }

    callback(null, data);
  });
};
