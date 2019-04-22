/* eslint-disable no-console */
const { src, dest, series, watch } = require('gulp');
const webpack = require('webpack-stream');
const plumber = require('gulp-plumber');
const { notify } = require('../utils');
const paths = require('../paths');
const isProduction = process.env.NODE_ENV === 'production';

const buildJs = () =>
  src(`${paths.js.src}index.js`)
    .pipe(
      plumber({
        errorHandler: err => {
          notify('JS build error', err);
        }
      })
    )
    .pipe(
      webpack({
        mode: process.env.NODE_ENV || 'development',
        devtool: isProduction ? false : 'inline-source-map',
        module: {
          rules: [
            {
              test: /\.(js)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
          ]
        },
        watch: false,
        output: {
          filename: `script.js`
        }
      })
    )
    .pipe(dest(paths.js.dest));

const watchJs = reload => {
  watch([`${paths.js.src}**/*.js`], series(buildJs, reload));
};

module.exports = {
  buildJs,
  watchJs
};
