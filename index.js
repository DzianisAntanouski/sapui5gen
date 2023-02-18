const readline = require('readline');
const createSapui5Folders = require('./createSapui5Folders');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter project name (default: mySapui5Project): ', function(projectName) {
  projectName = projectName || 'mySapui5Project';

  rl.question('Does the project have an OData service? (y/n, default: n): ', function(hasODataService) {
    if (hasODataService.toLowerCase() === 'y') {
      rl.question('Enter the URL of the OData service: ', function(oDataServiceUrl) {
        const urlRegExp = /^(https?):\/\/[^\s/$.?#].[^\s]*$/i;
        const isValidUrl = urlRegExp.test(oDataServiceUrl)
        createSapui5Folders(projectName, isValidUrl ? oDataServiceUrl : null);
        rl.close();
      });
    } else {
      createSapui5Folders(projectName);
      rl.close();
    }
  });
});
