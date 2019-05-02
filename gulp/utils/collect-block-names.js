const fs = require('fs-extra');

const collectBlockNames = (blocksPath, extension) => {
  extension = new RegExp(`\.(${extension})$`, 'i');

  return fs
    .readdirSync(blocksPath, 'utf8')
    .reduce((acc, block) => {
      const stat = fs.statSync(`${blocksPath}/${block}`);

      if (stat.isDirectory()) {
        collectBlockNames(`${blocksPath}/${block}`).forEach(subBlock =>
          acc.push(`${block}/${subBlock}`)
        );
      } else {
        acc.push(block);
      }

      return acc;
    }, [])
    .filter(block => extension.test(block));
};

module.exports = collectBlockNames;
