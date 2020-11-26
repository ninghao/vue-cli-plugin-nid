const appGenerator = require('./app/app.generator');
const componentGenerator = require('./component/component.generator');
const componentGeneratorHook = require('./component/component.generator.hook');
const storeGenerator = require('./store/store.generator');
const storeGeneratorHook = require('./store/store.generator.hook');

/**
 * 生成器
 */
module.exports = (api, options) => {
  // 应用
  appGenerator(api, options);

  // 组件生成器
  componentGenerator(api, options);

  // Store 生成器
  storeGenerator(api, options);
};

/**
 * 生成器钩子
 */
module.exports.hooks = (api, options) => {
  // 组件生成器钩子
  componentGeneratorHook(api, options);

  // Store 生成器钩子
  storeGeneratorHook(api, options);
};
