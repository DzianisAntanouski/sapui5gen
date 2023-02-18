const fs = require('fs');

function createStyleCss(projectName) {
  const content = `
/* Put your styles here */
  `;
  fs.writeFileSync(`${projectName}/module/style.css`, content);
  console.log(`File style.css created for project "${projectName}"`);
}

function createAppController(projectName) {
  const content = `
sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function(Controller) {
  "use strict";

  return Controller.extend("${projectName}.controller.App", {

  });
});
  `;
  fs.writeFileSync(`${projectName}/module/App.controller.js`, content);
  console.log(`File App.controller.js created for project "${projectName}"`);
}

function createAppView(projectName) {
  const content = `
<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" controllerName="${projectName}.controller.App">
  <App>
    <pages>
      <Page title="Home">
        <content>
          <Text text="Hello, SAPUI5!" />
        </content>
      </Page>
    </pages>
  </App>
</mvc:View>
  `;
  fs.writeFileSync(`${projectName}/module/App.view.xml`, content);
  console.log(`File App.view.xml created for project "${projectName}"`);
}

function createComponentJs(projectName) {
    const componentJS = `
      sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/core/mvc/JSONView",
        "sap/ui/model/json/JSONModel"
      ], function(UIComponent, JSONView, JSONModel) {
        "use strict";
  
        return UIComponent.extend("${projectName}", {
          metadata: {
            manifest: "json"
          },
  
          init: function() {
            UIComponent.prototype.init.apply(this, arguments);
  
            // set data model
            const oData = {};
            const oModel = new JSONModel(oData);
            this.setModel(oModel);
          },
  
          createContent: function() {
            // create root view
            const oView = new JSONView({
              viewName: "${projectName}.view.App"
            });
            return oView;
          }
        });
      });
    `;
    
    const projectDir = path.join(process.cwd(), projectName);
    const componentJSPath = path.join(projectDir, 'Component.js');
    
    fs.writeFileSync(componentJSPath, componentJS);
  };

  function createController(projectName, controllerName, viewName) {
    const controllerPath = path.join(__dirname, projectName, 'webapp', 'controller', controllerName);
  
    const controllerTemplate = `
      sap.ui.define([
        "sap/ui/core/mvc/Controller"
      ], function(Controller) {
        "use strict";
  
        return Controller.extend("${projectName}.controller.${viewName}.${controllerName}", {
          onInit: function() {
            // TODO
          }
        });
      });
    `;
  
    fs.mkdirSync(controllerPath, { recursive: true });
    fs.writeFileSync(path.join(controllerPath, `${controllerName}.controller.js`), controllerTemplate);
  }
  
  function createI18nProperties(projectName) {
    const i18nProperties = `
      appTitle=${projectName}
      appDescription=This is a ${projectName} SAPUI5 application.
    `;
    
    const i18nFolderPath = path.join(process.cwd(), projectName, 'webapp', 'i18n');
    fs.mkdirSync(i18nFolderPath, { recursive: true });
    
    const i18nFilePath = path.join(i18nFolderPath, 'i18n.properties');
    fs.writeFileSync(i18nFilePath, i18nProperties);
  }  

  function createIndexHtml(projectName) {
    const indexHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="UTF-8">
        <title>${projectName}</title>
        <script src="https://sapui5.hana.ondemand.com/resources/sap-ui-core.js"
                id="sap-ui-bootstrap"
                data-sap-ui-theme="sap_belize"
                data-sap-ui-libs="sap.m"
                data-sap-ui-xx-bindingSyntax="complex"
                data-sap-ui-xx-async="true">
        </script>
        <script>
          sap.ui.getCore().attachInit(function() {
            new sap.m.Shell({
              app: new sap.ui.core.ComponentContainer({
                name: "${projectName}"
              })
            }).placeAt("content");
          });
        </script>
      </head>
      <body class="sapUiBody" id="content">
      </body>
      </html>
    `;
    
    const projectDir = path.join(process.cwd(), projectName);
    const indexHTMLPath = path.join(projectDir, 'index.html');
    
    fs.writeFileSync(indexHTMLPath, indexHTML);
  };

  function createManifestJson(projectName) {
    const manifestJSON = `
      {
        "_version": "1.12.0",
        "sap.app": {
          "_version": "1.12.0",
          "id": "${projectName}",
          "type": "application",
          "i18n": "i18n/i18n.properties",
          "title": "{{appTitle}}",
          "description": "{{appDescription}}",
          "applicationVersion": {
            "version": "1.0.0"
          },
          "dataSources": {
            "mainService": {
              "uri": "",
              "type": "OData",
              "settings": {
                "odataVersion": "2.0",
                "localUri": "localService/metadata.xml"
              }
            }
          }
        },
        "sap.ui": {
          "_version": "1.12.0",
          "technology": "UI5",
          "icons": {
            "icon": "",
            "favIcon": "",
            "phone": "",
            "phone@2": "",
            "tablet": "",
            "tablet@2": ""
          },
          "deviceTypes": {
            "desktop": true,
            "tablet": true,
            "phone": true
          }
        }
      }
    `;
    
    const manifestPath = path.join(process.cwd(), projectName, 'webapp', 'manifest.json');
    fs.writeFileSync(manifestPath, manifestJSON);
  }

  function createView(projectName, viewName) {
    const viewPath = path.join(__dirname, projectName, 'webapp', 'view', viewName);
  
    const viewTemplate = `
      <mvc:View
        xmlns:mvc="sap.ui.core.mvc"
        displayBlock="true"
        xmlns="sap.m">
        <App />
      </mvc:View>
    `;
  
    fs.mkdirSync(viewPath, { recursive: true });
    fs.writeFileSync(path.join(viewPath, `${viewName}.view.xml`), viewTemplate);
  }

module.exports = {
  createStyleCss,
  createAppController,
  createAppView,
  createComponentJs,
  createController,
  createI18nProperties,
  createIndexHtml,
  createManifestJson,
  createView,
};
