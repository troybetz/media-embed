# media-embed

embed popular media formats using [noembed.com](http://noembed.com/)


## Installation

```
$ npm install media-embed
```

## Example

```js
import mediaEmbed from 'media-embed';

/**
 * Retrieve embed element
 */

const url = 'http://www.youtube.com/watch?v=iEe_eraFWWs';
mediaEmbed(url, (err, embed) => document.body.appendChild(embed));
```

## Usage

### `embed(url:string, callback:func)`
Return embed data for `url`.

Works with every media provider listed at http://noembed.com/, though
the formatting for things like tweets & gists is a little weird.

#### returns
- `{Error|null} err`
- `{HTMLElement|undefined} embed` iframe element
- `{Object|undefined} data` complete noembed.com response

# License

  MIT
