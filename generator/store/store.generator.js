const {
  getStoreTemplatePath,
  getStoreStateName,
  getStoreModuleName,
} = require('./store.service');

const storeGenerator = (api, options) => {
  if (!options.store) return;

  const storeTemplatePath = getStoreTemplatePath();

  // Store 数据类型
  const storeStateName = getStoreStateName(options);

  // Store 模块名
  const storeModuleName = getStoreModuleName(options);
};

module.exports = storeGenerator;
