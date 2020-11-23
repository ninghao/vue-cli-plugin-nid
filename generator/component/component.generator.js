const componentGenerator = (api, options) => {
  if (!options.component) return;

  api.render({
    'src/components/demo.vue': './templates/component.ejs',
  });
};

module.exports = componentGenerator;
