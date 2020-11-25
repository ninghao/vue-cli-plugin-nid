const { camelCase } = require('lodash');
const path = require('path');

const {
  getGeneratedFileImportPath,
  pascalCase,
} = require('../app/app.service');

/**
 * 获取 Store 模板文件路径
 */
const getStoreTemplatePath = (options) => {
  const { action } = options;

  let templateFile = 'store.ejs';

  if (action) {
    templateFile = 'store-action.ejs';
  }

  return path.join('.', 'templates', templateFile);
};

/**
 * 获取 Store 数据类型名
 */
const getStoreStateName = (options) => {
  const { store: storeName } = options;
  return pascalCase(storeName) + 'StoreState';
};

/**
 * 获取 Store 模块名
 */
const getStoreModuleName = (options) => {
  const { store: storeName } = options;
  return camelCase(storeName) + 'StoreModule';
};

/**
 * 获取 Store 导入声明
 */
const getStoreImportStatement = (options) => {
  const storeStateName = getStoreStateName(options);
  const storeModuleName = getStoreModuleName(options);
  const storeImportPath = getGeneratedFileImportPath('store', options);

  return `import { ${storeStateName}, ${storeModuleName} } from '${storeImportPath}';`;
};

/**
 * 获取 Store 选项
 */
const getStoreOptions = (options) => {
  let {
    // 动作名
    action = 'action',
    // 请求方法
    method = 'get',
    // 接口地址
    api = 'resources',
  } = options;

  return {
    ...options,
    action,
    method,
    api,
  };
};

module.exports = {
  getStoreTemplatePath,
  getStoreStateName,
  getStoreModuleName,
  getStoreImportStatement,
  getStoreOptions,
};
