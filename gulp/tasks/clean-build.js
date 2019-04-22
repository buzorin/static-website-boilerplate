const fs = require('fs-extra');
const paths = require('../paths');

const cleanBuild = done => {
  fs.removeSync(paths.global.dest);
  done();
};

module.exports = {
  cleanBuild
};
