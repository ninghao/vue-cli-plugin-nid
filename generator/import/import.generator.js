const {
  getTargetComponentPath,
  getComponentImportStatement,
  getImportComponentPath,
} = require('./import.service');

/**
 * 导入生成器
 */
const importGenerator = (api, options) => {
  // 解构命令选项
  const { importComponent } = options;

  if (!importComponent) return;

  if (importComponent) {
    // 导入组件的路径
    const importComponentPath = getImportComponentPath(api, options);

    // 导入声明
    const componentImportStatement = getComponentImportStatement(
      importComponentPath,
    );

    // 目标组件路径
    const targetComponentPath = getTargetComponentPath(api, options);

    // 插入导入声明
    api.injectImports(targetComponentPath, componentImportStatement);
  }
};

/**
 * 导出
 */
module.exports = importGenerator;
