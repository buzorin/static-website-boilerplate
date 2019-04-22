/* eslint-disable no-console */
const { src, dest, series, watch } = require('gulp');
const plumber = require('gulp-plumber');
const { notify } = require('../utils');
const paths = require('../paths');

const copyAssets = () =>
  src(
    [
      `${paths.img.src}**/*.{png,jpg,webp}`,
      `${paths.fonts.src}**/*.{woff,woff2}`
    ],
    {
      base: paths.global.src
    }
  )
    .pipe(
      plumber({
        errorHandler: err => {
          notify('Assets copy error', err);
        }
      })
    )
    .pipe(dest(paths.global.dest));

const watchAssets = reload => {
  watch(
    [
      `${paths.img.src}**/*.{png,jpg,webp}`,
      `${paths.fonts.src}**/*.{woff,woff2}`
    ],
    series(copyAssets, reload)
  );
};

module.exports = {
  copyAssets,
  watchAssets
};
