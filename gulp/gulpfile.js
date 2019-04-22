const { task, series, parallel } = require('gulp');
const {
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
} = require('./tasks');
const paths = require('./paths');
const server = require('browser-sync').create();

const main = series(
  cleanBuild,
  parallel(copyAssets, svgSprite, buildPug, buildSass, buildJs)
);

const serve = done => {
  server.init({
    server: paths.global.dest,
    port: 3000,
    notify: false,
    open: true,
    cors: true,
    ui: false,
    browser: 'Google Chrome'
  });
  done();
};

const reload = done => {
  server.reload();
  done();
};

const watch = () => {
  watchPug(reload);
  watchSass(reload);
  watchJs(reload);
  watchAssets(reload);
  watchSvgIcons(reload);
};

task('start', series(main, serve, watch));

task('build', series(main, revision));
