const fs = require('fs');
const { EOL } = require('os');
const { pascalCase } = require('../app/app.service');

const {
  getTargetComponentPath,
  getVuexImportHelpers,
} = require('./import.service');

const {
  getProjectFileContent,
  insertFileContent,
} = require('../app/app.service');

/**
 * 导入生成器钩子
 */
const importGeneratorHook = (api, options) => {
  api.afterInvoke(() => {
    const { importComponent, importVuex } = options;

    if (importComponent) {
      componentImportGeneratorHook(api, options);
    }

    if (importVuex) {
      vuexImportGeneratorHook(api, options);
    }
  });
};

/**
 * 组件导入生成器钩子
 */
const componentImportGeneratorHook = (api, options) => {
  // 解构命令选项
  const { importComponent, to: targetComponent } = options;

  // 目标组件
  const targetComponentPath = getTargetComponentPath(api, options);

  let targetComponentFileContent = getProjectFileContent(
    targetComponentPath,
    api,
  );

  // 注册组件
  const registerComponent =
    importComponent
      .split(',')
      .map((item) => pascalCase(item))
      .join(`,${EOL}    `) + ',';

  targetComponentFileContent = insertFileContent({
    fileContent: targetComponentFileContent,
    find: 'components: {',
    insert: `${EOL}    ${registerComponent}`,
  });

  // 使用组件
  const useComponent = importComponent
    .split(',')
    .map((item) => `<${pascalCase(item)} />`)
    .join(`${EOL}    `);

  targetComponentFileContent = insertFileContent({
    fileContent: targetComponentFileContent,
    find: `<div class="${targetComponent}">`,
    insert: `${EOL}    ${useComponent}`,
  });

  // 写入目标组件文件
  fs.writeFileSync(
    api.resolve(targetComponentPath),
    targetComponentFileContent.join(EOL),
    {
      encoding: 'utf-8',
    },
  );
};

/**
 * Vuex 导入生成器钩子
 */
const vuexImportGeneratorHook = (api, options) => {
  // 解构命令选项
  const { importComponent, to: targetComponent } = options;

  // 目标组件
  const targetComponentPath = getTargetComponentPath(api, options);

  // 导入帮手方法
  const importVuexHelpers = getVuexImportHelpers(api, options);

  // 目录组件文件内容
  let targetComponentFileContent = getProjectFileContent(
    targetComponentPath,
    api,
  );

  // 确定使用的帮手
  const useMapState = importVuexHelpers.includes('mapState');
  const useMapGetters = importVuexHelpers.includes('mapGetters');
  const useMapMutations = importVuexHelpers.includes('mapMutations');
  const useMapActions = importVuexHelpers.includes('mapActions');

  // 插入内容
  importVuexHelpers.map((helper) => {
    if (useMapState || useMapGetters) {
      targetComponentFileContent = insertFileContent({
        fileContent: targetComponentFileContent,
        find: `computed: {`,
        insert: `${EOL}    ...${helper}({}),`,
      });
    }

    if (useMapMutations || useMapActions) {
      targetComponentFileContent = insertFileContent({
        fileContent: targetComponentFileContent,
        find: `methods: {`,
        insert: `${EOL}    ...${helper}({}),`,
      });
    }
  });

  // 写入目标组件文件
  fs.writeFileSync(
    api.resolve(targetComponentPath),
    targetComponentFileContent.join(EOL),
    {
      encoding: 'utf-8',
    },
  );
};

/**
 * 导出
 */
module.exports = importGeneratorHook;
