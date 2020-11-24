const path = require('path');

/**
 * 获取 Store 模板文件路径
 */
const getStoreTemplatePath = () => {
  return path.join('.', 'templates', 'store.ejs');
};

module.exports = {
  getStoreTemplatePath,
};
