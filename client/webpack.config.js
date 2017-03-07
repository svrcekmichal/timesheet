var relayLib = require('./scripts/relay');
var fs = require('fs');

module.exports = function(webpackConfig, isDevelopment) {

  /**
   * Relay setup
   */

  const babelRule = findRule(webpackConfig, function(rule){ return rule.loader === 'babel-loader' });
  babelRule.options.plugins = babelRule.options.plugins || [];
  babelRule.options.plugins.push([relayLib.getBabelRelayPlugin(), { enforceSchema: true }]);
  babelRule.options.cacheDirectory = true;
  babelRule.options.cacheIdentifier = fs.statSync('./graphql-schema.json').mtime;

   babelRule.options.plugins.push('styled-components');

  return webpackConfig;
}

function findRule(config, callback) {
  var index = config.module.rules.findIndex(callback);
  if(index === -1) throw Error('Rule now found');
  return config.module.rules[index];
}