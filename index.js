const defaultBrowsers = [
  'last 8 Chrome versions',
  'last 4 Firefox versions',
  'last 3 Safari versions',
  'last 4 Edge versions',
  'Firefox ESR',
  'Chrome >= 55'
]
const mobileBrowsers = [
  'Chrome >= 55',
  'Firefox >= 53',
  'Safari >= 10.3',
  'Edge >= 15',
  'Opera >= 42'
]
module.exports = function babelPresetGitHub(api, { modules = false, targets = {} }) {
  targets = Object.assign({}, { browsers: defaultBrowsers }, targets)
  if (targets.browsers === 'mobile') targets.browsers = mobileBrowsers
  if (targets.browsers === 'default') targets.browsers = defaultBrowsers
  return {
    plugins: [
      // ES2019
      // Stage 3 with good signals for Stage 4
      // Chrome 64+, Firefox 62+, Safari TP42, Opera 51+
      require('@babel/plugin-syntax-import-meta').default,
      // Chrome 63+, Firefox (https://mzl.la/2LMSnOf), Safari TP25, Opera 50+
      require('@babel/plugin-syntax-dynamic-import').default,

      // Non-standard
      require('@babel/plugin-transform-flow-strip-types').default,
      require('@babel/plugin-proposal-class-properties').default,
      // Custom 
      require('babel-plugin-transform-invariant-location'),
    ],
    presets: [
      // ES6/2017
      [require('@babel/preset-env').default, { modules, targets }]
    ],
  };
};
