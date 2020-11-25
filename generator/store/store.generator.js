const {
  getStoreTemplatePath,
  getStoreStateName,
  getStoreModuleName,
  getStoreImportStatement,
  getStoreOptions,
} = require('./store.service');

const {
  getGeneratedFilePath,
  getParentFilePath,
} = require('../app/app.service');

const storeGenerator = (api, options) => {
  if (!options.store) return;

  const storeTemplatePath = getStoreTemplatePath(options);

  // Store 数据类型
  const storeStateName = getStoreStateName(options);

  // Store 模块名
  const storeModuleName = getStoreModuleName(options);

  // Store 存放位置
  const generatedStorePath = getGeneratedFilePath('store', options);

  // Store 选项
  options = getStoreOptions(options);

  api.render(
    {
      [generatedStorePath]: storeTemplatePath,
    },
    {
      storeStateName,
      storeModuleName,
      ...options,
    },
  );

  if (options.parent) {
    const parentStorePath = getParentFilePath('store', options);
    const storeImportStatement = getStoreImportStatement(options);

    api.injectImports(parentStorePath, storeImportStatement);
  }
};

module.exports = storeGenerator;
