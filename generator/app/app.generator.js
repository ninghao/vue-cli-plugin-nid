/**
 * 应用生成器
 */
const appGenerator = (api, options) => {
  // 在项目的 package.json 里添加命令
  api.extendPackage({
    scripts: {
      'generate:component': 'vue invoke vue-cli-plugin-nid --component',
      'generate:store': 'vue invoke vue-cli-plugin-nid --store',
      'import:component': 'vue invoke vue-cli-plugin-nid --importComponent',
      'import:vuex': 'vue invoke vue-cli-plugin-nid --importVuex',
      gc: 'vue invoke vue-cli-plugin-nid --component',
      gs: 'vue invoke vue-cli-plugin-nid --store',
      ic: 'vue invoke vue-cli-plugin-nid --importComponent',
      iv: 'vue invoke vue-cli-plugin-nid --importVuex',
    },
  });
};

/**
 * 导出
 */
module.exports = appGenerator;
