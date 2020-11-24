const {
  getStoreTemplatePath,
  getStoreStateName,
  getStoreModuleName,
} = require('./store.service');

const { getGeneratedFilePath } = require('../app/app.service');

const storeGenerator = (api, options) => {
  if (!options.store) return;

  const storeTemplatePath = getStoreTemplatePath();

  // Store 数据类型
  const storeStateName = getStoreStateName(options);

  // Store 模块名
  const storeModuleName = getStoreModuleName(options);

  // Store 存放位置
  const generatedStorePath = getGeneratedFilePath('store', options);

  api.render(
    {
      [generatedStorePath]: storeTemplatePath,
    },
    {
      storeStateName,
      storeModuleName,
    },
  );
};

module.exports = storeGenerator;
