const path = require('path');
const { camelCase, startCase } = require('lodash');

/**
 * 获取组件模板文件路径
 */
const getTemplatePath = () => {
  const componentTemplatePath = path.join('.', 'templates', 'component.ejs');
  const styleTemplatePath = path.join('.', 'templates', 'component.style.ejs');

  return { componentTemplatePath, styleTemplatePath };
};

/**
 * 获取组件名称
 */
const getComponentName = (options) => {
  const { component: componentName } = options;
  const componentNamePascalCase = startCase(camelCase(componentName)).replace(
    / /g,
    '',
  );

  return { componentName, componentNamePascalCase };
};

module.exports = {
  getTemplatePath,
  getComponentName,
};
