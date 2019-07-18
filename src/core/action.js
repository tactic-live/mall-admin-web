// 获取pages/**/reducer.js
const files = require.context('../pages', true, /\.\/[^/]+\/action.js$/);
const actions = {};
files.keys().forEach(key => {
  const module = key.split('/')[1];
  const contents = files(key);
  const actionModule = contents.default ? contents.default : contents;
  const { ACTION_TYPES, ...actionFuns } = actionModule;
  actions[module] = {
    TYPES: ACTION_TYPES,
    ...actionFuns
  }
  console.log('actionModule', contents, actions, actionModule)
});
console.log('actions', actions)
// module.exports = reducers;
export default actions;
