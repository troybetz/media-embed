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
});