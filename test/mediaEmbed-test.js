var chai = require('chai');
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var expect = chai.expect;
var jsonpStub;
var mediaEmbed;

describe('mediaEmbed', function() {
  beforeEach(function() {
    jsonpStub = sinon.stub();
    mediaEmbed = proxyquire('../', {'jsonp': jsonpStub});
  });

  it('should throw an error if called without `url`', function() {
    expect(mediaEmbed).to.throw('url required for embedding');
  });

  it('should retrieve embed html from noembed.com', function() {
    mediaEmbed('https://soundcloud.com/hudsonmohawke/chimes');
    expect(jsonpStub.firstCall.args[0]).to.equal('https://noembed.com/embed?url=https://soundcloud.com/hudsonmohawke/chimes&nowrap=on');
  });

  it('should append embed html to the `parent`', function() {
    var parent = document.createElement('div');
    parent.id = 'parent';
    document.body.appendChild(parent);

    mediaEmbed('https://soundcloud.com/hudsonmohawke/chimes', parent);      

    jsonpStub.yield(null, {
      html: '<p id="embed">a new embed</p>'
    });

    var embed = document.querySelector('#embed');

    expect(parent.contains(embed)).to.be.ok();
    document.body.removeChild(parent);
  });

  it('should default to document.body if `parent` is omitted', function() {
    mediaEmbed('https://soundcloud.com/hudsonmohawke/chimes');      

    jsonpStub.yield(null, {
      html: '<p id="embed">a new embed</p>'
    });

    var embed = document.querySelector('#embed');

    expect(document.body.contains(embed)).to.be.ok();
    document.body.removeChild(embed);
  });
});
