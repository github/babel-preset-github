# babel-preset-github

This is a Babel preset which GitHub.com uses to transpile our JavaScript. It supports ES2018, plus a few extra non-standard features which we use to make development easier.

Pull requests that fix bugs are welcome. We will likely only add new plugins as they are needed for the GitHub.com codebase.


To install you need node and npm:

```bash
$ npm i -D babel-preset-github
```

Then use the preset in your `.babelrc`

```json
{
  "presets": ["github"]
}
```

This example only includes the polyfills and code transforms needed for a specific list of browsers that GitHub supports. You can change this by passing in a valid browserlist:

```json
{
	"presets": [
		["github", {
			"targets": {
				"browsers": ["last 2 versions", "safari >= 7"]
			}
		}]
	]
}
```

### LICENSE

The MIT License (MIT)

Copyright © 2018 GitHub Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
