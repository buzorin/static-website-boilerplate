const fs = require('fs-extra');

const collectBlockNames = blocksPath =>
  fs.readdirSync(blocksPath, 'utf8').reduce((acc, block) => {
    const stat = fs.statSync(`${blocksPath}/${block}`);

    if (stat.isDirectory()) {
      collectBlockNames(`${blocksPath}/${block}`).forEach(subBlock =>
        acc.push(`${block}/${subBlock}`)
      );
    } else {
      acc.push(block);
    }

    return acc;
  }, []);

module.exports = collectBlockNames;
