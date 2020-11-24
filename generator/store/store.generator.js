const { getStoreTemplatePath } = require('./store.service');

const storeGenerator = (api, options) => {
  if (!options.store) return;

  const storeTemplatePath = getStoreTemplatePath();
};

module.exports = storeGenerator;
