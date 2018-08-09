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
