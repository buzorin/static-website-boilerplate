/* eslint-disable no-console */
const { src, dest, series, watch } = require('gulp');
const svgstore = require('gulp-svgstore');
const plumber = require('gulp-plumber');
const { notify } = require('../utils');
const paths = require('../paths');

const svgSprite = () =>
  src([`${paths.img.src}**/icon-*.svg`], {
    base: 'sprite'
  })
    .pipe(
      plumber({
        errorHandler: err => {
          notify('SVG sprite error', err);
        }
      })
    )
    .pipe(
      svgstore({
        inlineSvg: true
      })
    )
    .pipe(dest(paths.img.dest));

const watchSvgIcons = reload => {
  watch([`${paths.img.src}**/icon-*.svg`], series(svgSprite, reload));
};

module.exports = {
  svgSprite,
  watchSvgIcons
};
