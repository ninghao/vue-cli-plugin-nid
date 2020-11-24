const componentGeneratorHook = (api, options) => {
  api.afterInvoke(() => {
    console.log('after hook ~~~~~~~~~~~~');
  });
};

module.exports = componentGeneratorHook;
