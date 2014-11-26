/**
 * Module dependencies
 */

var mediaEmbed = require('../');
var container = document.querySelector('.embed-examples');

var urls = [
	'https://www.youtube.com/watch?v=8lXdyD2Yzls',
	'https://soundcloud.com/hudsonmohawke/chimes',
	'http://vimeo.com/94502406',
	'https://vine.co/v/O5O23XurHgw',
	'https://twitter.com/salihughes/status/454660014733807616',
	'https://gist.github.com/compedit/56652881ec96db20c687',
	'https://jkjfdslfd.com', // will fail
];

/**
 * Take each of the urls, and add them onto the page.
 */

urls.forEach(function(url) {
	mediaEmbed(url, function(err, embed) {
		if (err) throw err;
		addToPage(embed);
	});
});

/**
 * util
 */

function addToPage(embed) {
  var wrapper = document.createElement('div');
  wrapper.classList.add('noembed-container');
  wrapper.classList.add('col-xs-12');
  wrapper.appendChild(embed);
  container.appendChild(wrapper);
}