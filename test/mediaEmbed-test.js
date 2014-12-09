var chai = require('chai');
var sinon = require('sinon');
var proxyquire = require('proxyquireify')(require);
var expect = chai.expect;
var jsonpStub;
var mediaEmbed;

describe('mediaEmbed', function() {
  beforeEach(function() {
    jsonpStub = sinon.stub();
    mediaEmbed = proxyquire('../', {'jsonp': jsonpStub});
  });

  it('should throw an error if called with invalid `url`', function() {
    expect(mediaEmbed).to.throw('valid url required for embedding');
  });

  it('should retrieve embed data from noembed.com', function() {
    mediaEmbed('https://soundcloud.com/hudsonmohawke/chimes');
    expect(jsonpStub.firstCall.args[0]).to.equal('https://noembed.com/embed?url=https://soundcloud.com/hudsonmohawke/chimes&nowrap=on');
  });

  it('should return an error if no embed data is returned', function(done) {
    mediaEmbed('https://soundcloud.com/hudsonmohawke/chimes', function(err, embed) {
      expect(err).not.to.be.null();
      expect(err.message).to.equal('unable to embed https://soundcloud.com/hudsonmohawke/chimes');
      expect(embed).to.be.undefined();
      done();
    });

    jsonpStub.yield(null, {});
  });

  it('should return an error if embed request fails', function(done) {
    mediaEmbed('https://soundcloud.com/hudsonmohawke/chimes', function(err, embed) {
      expect(err).not.to.be.null();
      expect(err.message).to.equal('some network error');
      expect(embed).to.be.undefined();
      done();
    });

    jsonpStub.yield(new Error('some network error'), {});
  });

  it('should return embed html as a DOMElement', function(done) {
    mediaEmbed('https://soundcloud.com/hudsonmohawke/chimes', function(err, embed) {
      expect(err).to.be.null();
      expect(embed).not.to.be.undefined();
      expect(embed.nodeName).to.equal('DIV');
      done();
    });

    jsonpStub.yield(null, {
      html: '<div>I am an embedded thing.</div>'
    });
  });

  it('should return the entire noembed.com response as `data`', function(done) {
    var noembedResponse = {
      "width" : 425,
      "author_name" : "schmoyoho",
      "author_url" : "http://www.youtube.com/user/schmoyoho",
      "version" : "1.0",
      "provider_url" : "http://www.youtube.com/",
      "provider_name" : "YouTube",
      "thumbnail_width" : 480,
      "thumbnail_url" : "http://i3.ytimg.com/vi/bDOYN-6gdRE/hqdefault.jpg",
      "height" : 344,
      "thumbnail_height" : 360,
      "html" : "<iframe type='text/html' width='425' height='344' src='http://www.youtube.com/embed/bDOYN-6gdRE' frameborder=0></iframe>",
      "url" : "http://www.youtube.com/watch?v=bDOYN-6gdRE",
      "type" : "rich",
      "title" : "Auto-Tune the News #8: dragons. geese. Michael Vick. (ft. T-Pain)"
    };

    mediaEmbed('http://www.youtube.com/watch?v=bDOYN-6gdRE', function(err, embed, data) {
      expect(err).to.be.null();
      expect(embed).not.to.be.undefined();
      expect(data).to.equal(noembedResponse);
      done();
    });

    jsonpStub.yield(null, noembedResponse);
  });
});
