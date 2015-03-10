/**
 * Module dependencies
 */

import mediaEmbed from '../';
import './example.css';

const container = document.querySelector('.content');

const urls = [
	'https://soundcloud.com/hudsonmohawke/chimes',
  'https://www.youtube.com/watch?v=8lXdyD2Yzls',
  'https://vine.co/v/O5O23XurHgw',
	'http://vimeo.com/94502406',
	'https://twitter.com/salihughes/status/454660014733807616',
	'https://gist.github.com/compedit/56652881ec96db20c687',
	'https://jkjfdslfd.com', // will fail
];

/**
 * Take each of the urls, and add them onto the page.
 */

urls.forEach((url) => {
  mediaEmbed(url, (err, embed, data) => {
    if (err) throw err;
    addToPage(embed);

    console.log(data.provider_name, 'response:', data, '\n');
  });
});

/**
 * Add `embed` html to page
 *
 * @param {Object} embed
 */

const addToPage = (embed) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('noembed-container');
  wrapper.appendChild(embed);
  container.appendChild(wrapper);
};
