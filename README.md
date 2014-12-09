# media-embed

embed popular media formats using [noembed.com](http://noembed.com/)


## Installation

```
$ npm install media-embed
```

Then use [**browserify**](http://browserify.org/).

## Usage


```js
var mediaEmbed = require('media-embed');

/**
 * Retrieve embed element
 */
 
mediaEmbed('http://www.youtube.com/watch?v=iEe_eraFWWs', function(err, embed, data) {
	document.body.appendChild(embed); // ready for embedding
  console.log(data); // => entire noembed.com response 
});

```

# License

  MIT
