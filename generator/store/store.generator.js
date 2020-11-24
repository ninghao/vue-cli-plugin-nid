const { getStoreTemplatePath, getStoreStateName } = require('./store.service');

const storeGenerator = (api, options) => {
  if (!options.store) return;

  const storeTemplatePath = getStoreTemplatePath();

  // Store 数据类型
  const storeStateName = getStoreStateName(options);
};

module.exports = storeGenerator;
