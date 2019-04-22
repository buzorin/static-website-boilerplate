/* eslint-disable no-console */
const { src, dest, series, watch } = require('gulp');
const fs = require('fs-extra');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const flexBugsFix = require('postcss-flexbugs-fixes');
const postcssPresetEnv = require('postcss-preset-env');
const csso = require('gulp-csso');
const gulpif = require('gulp-if');
const { collectBlockNames, notify } = require('../utils');
const paths = require('../paths');
const isProduction = process.env.NODE_ENV === 'production';

const buildSass = () => {
  const blocksImports = collectBlockNames(`${paths.sass.src}blocks/`).map(
    block => `@import 'blocks/${block}';`
  );

  fs.writeFileSync(
    `${paths.sass.src}blocks.scss`,
    '// This file is automatically generated\n' +
      blocksImports.join('\n') +
      '\n'
  );

  return src(`${paths.sass.src}style.scss`)
    .pipe(
      plumber({
        errorHandler: err => {
          notify('SASS build error', err);
        }
      })
    )
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(sass())
    .pipe(
      postcss([
        flexBugsFix(),
        postcssPresetEnv({
          autoprefixer: {
            flexbox: 'no-2009'
          },
          stage: 3
        })
      ])
    )
    .pipe(gulpif(isProduction, csso()))
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    .pipe(dest(paths.sass.dest));
};

const watchSass = reload => {
  watch(
    [`!(${paths.sass.src}blocks.scss)`, `${paths.sass.src}**/*.scss`],
    series(buildSass, reload)
  );
};

module.exports = {
  buildSass,
  watchSass
};
