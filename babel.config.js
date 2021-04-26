'use strict';

module.exports = function (api) {
  api.cache(true);

  const presets = [
    [ '@babel/env', { loose: true, corejs: '3', useBuiltIns: 'usage', modules: false } ],
    [ '@babel/react', { development: process.env.BABEL_ENV === 'development' } ]
  ];

  const plugins = [
    '@babel/plugin-proposal-class-properties'
  ];

  return {
    presets,
    plugins
  };
};
