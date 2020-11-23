const { getGeneratedFilePath } = require('../app/app.service');

const componentGenerator = (api, options) => {
  if (!options.component) return;

  // 组件的存放位置
  const generatedComponentPath = getGeneratedFilePath('component', options);
  console.log(generatedComponentPath);

  // api.render({
  //   'src/components/demo.vue': './templates/component.ejs',
  // });
};

module.exports = componentGenerator;
