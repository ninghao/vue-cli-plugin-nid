const fs = require('fs');
const { EOL } = require('os');
const { getStoreStateName, getStoreModuleName } = require('./store.service');
const {
  getParentFilePath,
  getProjectFileContent,
  insertFileContent,
} = require('../app/app.service');

const storeGeneratorHook = (api, options) => {
  api.afterInvoke(() => {
    if (!options.store || !options.parent || !options.module) return;
    const { module: moduleName, parent: parentStore } = options;

    const storeStateName = getStoreStateName(options);
    const storeModuleName = getStoreModuleName(options);
    const parentStorePath = getParentFilePath('store', options);
    let parentFileContent = getProjectFileContent(parentStorePath, api);

    let findParentStoreState;

    if (parentStore === 'app/app') {
      findParentStoreState = 'export interface RootState';
    } else {
      findParentStoreState = 'export interface .+StoreState';
    }

    parentFileContent = insertFileContent({
      fileContent: parentFileContent,
      find: findParentStoreState,
      insert: `${EOL}  ${moduleName}: ${storeStateName},`,
    });

    parentFileContent = insertFileContent({
      fileContent: parentFileContent,
      find: 'modules: {',
      insert: `${EOL}    ${moduleName}: ${storeModuleName},`,
    });

    fs.writeFileSync(
      api.resolve(parentStorePath),
      parentFileContent.join(EOL),
      {
        encoding: 'utf-8',
      },
    );
  });
};

module.exports = storeGeneratorHook;
