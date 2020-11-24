const {
  getParentFilePath,
  getProjectFileContent,
} = require('../app/app.service');

const componentGeneratorHook = (api, options) => {
  api.afterInvoke(() => {
    if (!options.component || !options.parent) return;

    const parentComponentPath = getParentFilePath('component', options);
    let parentFileContent = getProjectFileContent(parentComponentPath, api);

    console.log(parentFileContent);
  });
};

module.exports = componentGeneratorHook;
