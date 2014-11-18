/**
 * Module dependencies
 */

var mediaEmbed = require('../');

var urls = {
  youtube: 'https://www.youtube.com/watch?v=8lXdyD2Yzls',
  soundcloud: 'https://soundcloud.com/hudsonmohawke/chimes',
  vimeo: 'http://vimeo.com/94502406',
  vine: 'https://vine.co/v/O5O23XurHgw',
  rdio: 'https://www.rdio.com/i/QF5RL8scpw/',
  twitter: 'https://twitter.com/salihughes/status/454660014733807616',
  gist: 'https://gist.github.com/compedit/56652881ec96db20c687'
};

Object.keys(urls).forEach(function(key) {
  mediaEmbed(urls[key]);
});
