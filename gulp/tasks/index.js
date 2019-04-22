const { cleanBuild } = require('./clean-build');
const { copyAssets, watchAssets } = require('./copy-assets');
const { svgSprite, watchSvgIcons } = require('./svg-sprite');
const { buildPug, watchPug } = require('./pug');
const { buildSass, watchSass } = require('./sass');
const { buildJs, watchJs } = require('./js');
const { revision } = require('./revision');

module.exports = {
  cleanBuild,
  copyAssets,
  watchAssets,
  svgSprite,
  watchSvgIcons,
  buildPug,
  watchPug,
  buildSass,
  watchSass,
  buildJs,
  watchJs,
  revision
};
