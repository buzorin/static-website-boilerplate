/* eslint-disable no-console */
const { src, dest, series, watch } = require('gulp');
const fs = require('fs-extra');
const foldero = require('foldero');
const plumber = require('gulp-plumber');
const { notify } = require('../utils');
const pug = require('gulp-pug');
const htmlhint = require('gulp-htmlhint');
const { collectBlockNames } = require('../utils');
const paths = require('../paths');
const isProduction = process.env.NODE_ENV === 'production';

const getSiteContent = () =>
  foldero(`${paths.pug.src}data/`, {
    recurse: true,
    whitelist: '(.*/)*.+.(json)$',
    loader: file => {
      let json = {};

      try {
        json = JSON.parse(fs.readFileSync(file, 'utf8'));
      } catch (err) {
        console.log(`Data parse error in file: ${file}`);
        console.log(err);
      }

      return json;
    }
  });

const buildPug = () => {
  const blocksIncludes = collectBlockNames(
    `${paths.pug.src}blocks/`,
    'pug'
  ).map(block => `include ../blocks/${block}`);

  fs.writeFileSync(
    `${paths.pug.src}layouts/blocks.pug`,
    '//- This file is automatically generated\n' +
      blocksIncludes.join('\n') +
      '\n'
  );

  return src(`${paths.pug.src}pages/*.pug`)
    .pipe(
      plumber({
        errorHandler: err => {
          notify('Pug build error', err);
        }
      })
    )
    .pipe(
      pug({
        locals: {
          CONTENT: getSiteContent()
        },
        pretty: !isProduction
      })
    )
    .pipe(htmlhint('../.htmlhintrc'))
    .pipe(htmlhint.failOnError())
    .pipe(dest(paths.pug.dest));
};

const watchPug = reload => {
  watch(
    [
      `!(${paths.pug.src}layouts/blocks.pug)`,
      `${paths.pug.src}**/*.pug`,
      `${paths.pug.src}data/*.json`
    ],
    series(buildPug, reload)
  );
};

module.exports = {
  buildPug,
  watchPug
};
