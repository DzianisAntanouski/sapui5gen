const fs = require('fs');
const path = require('path');

function createSapui5Folders(projectName) {
  const rootPath = path.join(__dirname, projectName);
  const folderPaths = [
    'Component',
    'controller',
    'i18n',
    'model',
    'test/unit',
    'util',
    'view'
  ];
  folderPaths.forEach(folderPath => {
    const fullPath = path.join(rootPath, folderPath);
    fs.mkdirSync(fullPath, { recursive: true });
  });
}

module.exports = createSapui5Folders;