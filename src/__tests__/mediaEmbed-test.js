/* eslint-disable no-unused-vars */

jest.dontMock('../mediaEmbed');

import jsonp from 'jsonp';
import domify from 'domify';
import mediaEmbed from '../mediaEmbed';

/**
 * Actual response from noembed.com
 */

const embedData = {
  'width': 425,
  'author_name': 'schmoyoho',
  'author_url': 'http://www.youtube.com/user/schmoyoho',
  'version': '1.0',
  'provider_url': 'http://www.youtube.com/',
  'provider_name': 'YouTube',
  'thumbnail_width': 480,
  'thumbnail_url': 'http://i3.ytimg.com/vi/bDOYN-6gdRE/hqdefault.jpg',
  'height': 344,
  'thumbnail_height': 360,
  'html': '<iframe type="text/html" width="425" height="344" src="http://www.youtube.com/embed/bDOYN-6gdRE" frameborder=0></iframe>',
  'url': 'http://www.youtube.com/watch?v=bDOYN-6gdRE',
  'type': 'rich',
  'title': 'Auto-Tune the News #8: dragons. geese. Michael Vick. (ft. T-Pain)'
 };

describe('mediaEmbed', () => {
  it('should throw an error if called with invalid `url`', () => {
    expect(mediaEmbed).toThrow('valid url required for embedding');
  });

  it('should retrieve embed data from noembed.com', () => {
    mediaEmbed('https://soundcloud.com/hudsonmohawke/chimes');
    expect(jsonp.mock.calls[0][0]).toBe('https://noembed.com/embed?url=https://soundcloud.com/hudsonmohawke/chimes&nowrap=on');
  });

  it('should return an error if embed request fails', () => {
    jsonp.mockImplementation((url, cb) => cb(new Error('some network error')));

    mediaEmbed('https://soundcloud.com/hudsonmohawke/chimes', (err, embed) => {
      expect(err.message).toBe('some network error');
    });
  });

  it('should return an error if no embed data is returned', () => {
    jsonp.mockImplementation((url, cb) => cb(null, {}));

    mediaEmbed('https://soundcloud.com/hudsonmohawke/chimes', (err, embed) => {
      expect(err.message).toEqual('unable to embed https://soundcloud.com/hudsonmohawke/chimes');
    });
  });

  it('should convert html returned from noembed.com to DOM element', () => {
    jsonp.mockImplementation((url, cb) => cb(null, embedData));

    mediaEmbed('https://soundcloud.com/hudsonmohawke/chimes', (err, embed) => {
      expect(err).toBeNull();
      expect(domify.mock.calls[0][0]).toEqual(embedData.html);
    });
  });

  it('should return the entire noembed.com response as `data`', () => {
    jsonp.mockImplementation((url, cb) => cb(null, embedData));

    mediaEmbed('https://soundcloud.com/hudsonmohawke/chimes', (err, embed, data) => {
      expect(err).toBeNull();
      expect(data).toEqual(embedData);
    });
  });
});
