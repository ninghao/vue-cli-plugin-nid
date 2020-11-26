/**
 * 应用生成器
 */
const appGenerator = (api, options) => {
  // 在项目的 package.json 里添加命令
  api.extendPackage({
    scripts: {
      'generate:component': 'vue invoke vue-cli-plugin-nid --component',
      'generate:store': 'vue invoke vue-cli-plugin-nid --store',
      gc: 'vue invoke vue-cli-plugin-nid --component',
      gs: 'vue invoke vue-cli-plugin-nid --store',
    },
  });
};

/**
 * 导出
 */
module.exports = appGenerator;
