const appGenerator = require('./app/app.generator');
const componentGenerator = require('./component/component.generator');

module.exports = (api, options) => {
  console.log(options);
  appGenerator(api, options);

  // Component
  componentGenerator(api, options);
};
