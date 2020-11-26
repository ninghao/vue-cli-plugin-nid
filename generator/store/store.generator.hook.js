const fs = require('fs');
const { EOL } = require('os');

const {
  getParentFilePath,
  getProjectFileContent,
  insertFileContent,
} = require('../app/app.service');

const { getStoreStateName, getStoreModuleName } = require('./store.service');

/**
 * Store 生成器钩子
 */
const storeGeneratorHook = (api, options) => {
  api.afterInvoke(() => {
    if (!options.store || !options.parent || !options.module) return;
    const { module: moduleName, parent: parentStore } = options;

    // Store 数据类型
    const storeStateName = getStoreStateName(options);

    // Store 模块名
    const storeModuleName = getStoreModuleName(options);

    // 父 Store 路径
    const parentStorePath = getParentFilePath('store', options);

    // 父 Store 文件内容
    let parentFileContent = getProjectFileContent(parentStorePath, api);

    // 查找父 Store 文件
    let findParentStoreState;

    if (parentStore === 'app/app') {
      findParentStoreState = 'export interface RootState';
    } else {
      findParentStoreState = 'export interface .+StoreState';
    }

    // 在父 Store 类型里插入模块
    parentFileContent = insertFileContent({
      fileContent: parentFileContent,
      find: findParentStoreState,
      insert: `${EOL}  ${moduleName}: ${storeStateName},`,
    });

    // 在父 Store 模块里注册模块
    parentFileContent = insertFileContent({
      fileContent: parentFileContent,
      find: 'modules: {',
      insert: `${EOL}    ${moduleName}: ${storeModuleName},`,
    });

    // 写入父 Store 模块文件
    fs.writeFileSync(
      api.resolve(parentStorePath),
      parentFileContent.join(EOL),
      {
        encoding: 'utf-8',
      },
    );
  });
};

/**
 * 导出
 */
module.exports = storeGeneratorHook;
