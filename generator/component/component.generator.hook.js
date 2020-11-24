const { EOL } = require('os');
const fs = require('fs');
const {
  getParentFilePath,
  getProjectFileContent,
  insertFileContent,
  getParentName,
} = require('../app/app.service');
const { getComponentName } = require('./component.service');

const componentGeneratorHook = (api, options) => {
  api.afterInvoke(() => {
    if (!options.component || !options.parent) return;

    const parentComponentPath = getParentFilePath('component', options);
    let parentFileContent = getProjectFileContent(parentComponentPath, api);

    const findComponentsOptions = 'components: {';
    const { componentNamePascalCase } = getComponentName(options);
    const insertComponentsOptionsContent = `${EOL}    ${componentNamePascalCase},`;

    parentFileContent = insertFileContent({
      fileContent: parentFileContent,
      find: findComponentsOptions,
      insert: insertComponentsOptionsContent,
    });

    const parentComponentName = getParentName(options);
    const findWrapperElement = `<div class="${parentComponentName}">`;
    const insertWrapperElementContent = `${EOL}    <${componentNamePascalCase} />`;

    parentFileContent = insertFileContent({
      fileContent: parentFileContent,
      find: findWrapperElement,
      insert: insertWrapperElementContent,
    });

    fs.writeFileSync(
      api.resolve(parentComponentPath),
      parentFileContent.join(EOL),
      {
        encoding: 'utf-8',
      },
    );
  });
};

module.exports = componentGeneratorHook;
