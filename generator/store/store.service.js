const { camelCase, startCase } = require('lodash');
const path = require('path');

/**
 * 获取 Store 模板文件路径
 */
const getStoreTemplatePath = () => {
  return path.join('.', 'templates', 'store.ejs');
};

/**
 * 获取 Store 数据类型名
 */
const getStoreStateName = (options) => {
  const { store: storeName } = options;
  return startCase(camelCase(storeName)).replace(/ /g, '') + 'StoreState';
};

/**
 * 获取 Store 模块名
 */
const getStoreModuleName = (options) => {
  const { store: storeName } = options;
  return camelCase(storeName) + 'StoreModule';
};

module.exports = {
  getStoreTemplatePath,
  getStoreStateName,
  getStoreModuleName,
};