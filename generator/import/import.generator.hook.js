const fs = require('fs');
const { EOL } = require('os');
const { pascalCase } = require('../app/app.service');
const { getTargetComponentPath } = require('./import.service');

const {
  getProjectFileContent,
  insertFileContent,
} = require('../app/app.service');

/**
 * 导入生成器钩子
 */
const importGeneratorHook = (api, options) => {
  api.afterInvoke(() => {
    if (!options.importComponent) return;

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
  });
};

/**
 * 导出
 */
module.exports = importGeneratorHook;
