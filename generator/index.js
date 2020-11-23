const appGenerator = require('./app/app.generator');

module.exports = (api, options) => {
  console.log(options);
  appGenerator(api, options);
};
