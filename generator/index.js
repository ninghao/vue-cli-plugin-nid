const appGenerator = require('./app/app.generator');
const componentGenerator = require('./component/component.generator');
const componentGeneratorHook = require('./component/component.generator.hook');

module.exports = (api, options) => {
  console.log(options);
  appGenerator(api, options);

  // Component
  componentGenerator(api, options);
};

module.exports.hooks = (api, options) => {
  componentGeneratorHook(api, options);
};
