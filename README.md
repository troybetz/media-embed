# media-embed

embed popular media formats using [noembed.com](http://noembed.com/)


## Installation

```
$ npm install media-embed
```

Then use [**browserify**](http://browserify.org/).

## Usage
Pass a `url` to be embedded within some `parent` element.


```js
var mediaEmbed = require('media-embed');

/**
 * Embed within a container
 */
 
var container = document.querySelector('.container');
mediaEmbed('http://www.youtube.com/watch?v=iEe_eraFWWs', container);

/**
 * Or just throw it onto the page. `parent` defaults to document.body if omitted.
 */
 
 mediaEmbed('https://gist.github.com/compedit/56652881ec96db20c687'); // onto the body
```

# License

  MIT
