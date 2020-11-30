const { last } = require('lodash');
const { pascalCase } = require('../app/app.service');

/**
 * 获取目标组件路径
 */
const getTargetComponentPath = (api, options) => {
  return Object.keys(api.generator.files).filter((file) =>
    file.includes(`${options.to}.vue`),
  )[0];
};

/**
 * 获取组件导入声明
 */
const getComponentImportStatement = (importComponentPath) => {
  return importComponentPath
    .map((item) => {
      // 组件名
      const componentName = pascalCase(
        last(item.split('/')).replace('.vue', ''),
      );

      // 组件路径
      const componentPath = item.replace('src/', '@/').replace('.vue', '');
      return { name: componentName, path: componentPath };
    })
    .map((item) => {
      return `import ${item.name} from '${item.path}';`;
    });
};

/**
 * 获取导入组件文件路径
 */
const getImportComponentPath = (api, options) => {
  const { importComponent } = options;

  return Object.keys(api.generator.files).filter((file) =>
    importComponent.split(',').some((item) => file.includes(`${item}.vue`)),
  );
};

/**
 * 导出
 */
module.exports = {
  getTargetComponentPath,
  getComponentImportStatement,
  getImportComponentPath,
};
