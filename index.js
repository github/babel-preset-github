const defaultBrowsers = [
  'last 8 Chrome versions',
  'last 4 Firefox versions',
  'last 3 Safari versions',
  'last 4 Edge versions',
  'Firefox ESR',
  'Chrome >= 61'
]
const mobileBrowsers = [
  'Chrome >= 55',
  'Firefox >= 63',
  'Safari >= 10.3',
  'Edge >= 15',
  'Opera >= 42'
]
const browserslist = require('browserslist')
module.exports = function babelPresetGitHub(api, { useBuiltIns = false, env = true, modules = false, targets = {} }) {
  targets = Object.assign({}, { browsers: defaultBrowsers }, targets)
  if (targets.browsers === 'mobile') targets.browsers = mobileBrowsers
  if (targets.browsers === 'default') targets.browsers = defaultBrowsers
  const presets = []
  const plugins = [
    // ES2019
    // Stage 3 with good signals for Stage 4
    // Chrome 64+, Firefox 62+, Safari TP42, Opera 51+
    require('@babel/plugin-syntax-import-meta').default,
    // Chrome 63+, Firefox (https://mzl.la/2LMSnOf), Safari TP25, Opera 50+
    require('@babel/plugin-syntax-dynamic-import').default,
    // Non-standard
    require('@babel/plugin-transform-flow-strip-types').default,
    // Custom 
    require('babel-plugin-transform-invariant-location'),
  ]
  const fullBrowsers = browserslist(targets.browsers)
  const needsRestSpread = browserslist(['Edge > 0', 'Safari < 11.1']).some(browser => fullBrowsers.includes(browser))
  if (env) {
    presets.push([require('@babel/preset-env').default, { modules, targets, useBuiltIns: useBuiltIns ? 'entry' : false }])
  } else if (needsRestSpread) {
    plugins.push([require('@babel/plugin-proposal-object-rest-spread'), { useBuiltIns }])
  }
  return { plugins, presets };
};
