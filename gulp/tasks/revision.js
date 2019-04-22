/* eslint-disable no-console */
const { src, dest, series } = require('gulp');
const plumber = require('gulp-plumber');
const { notify } = require('../utils');
const rev = require('gulp-rev');
const revDelete = require('gulp-rev-delete-original');
const revRewrite = require('gulp-rev-rewrite');
const paths = require('../paths');

const revision = () =>
  src(`${paths.global.dest}**/*.{css,js}`)
    .pipe(
      plumber({
        errorHandler: err => {
          notify('Revision error', err);
        }
      })
    )
    .pipe(rev())
    .pipe(revDelete())
    .pipe(dest(paths.global.dest))
    .pipe(rev.manifest())
    .pipe(dest(paths.global.dest));

const revisionRewrite = () => {
  const manifest = src(`${paths.global.dest}rev-manifest.json`);

  return src(`${paths.global.dest}**/*.html`)
    .pipe(
      plumber({
        errorHandler: err => {
          notify('Revision rewrite error', err);
        }
      })
    )
    .pipe(revRewrite({ manifest }))
    .pipe(dest(paths.global.dest));
};

module.exports = {
  revision: series(revision, revisionRewrite)
};
