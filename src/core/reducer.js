import { combineReducers } from 'redux';
// 获取pages/**/reducer.js
const files = require.context('../pages', true, /\.\/[^/]+\/reducer.js$/);
const reducers = {};
files.keys().forEach(key => {
  const module = key.split('/')[1].toLowerCase();
  console.log(`module [${module}]`)
  const contents = files(key);
  reducers[module] = contents.default ? contents.default : contents ;
});
const combReducers = combineReducers(reducers);

// module.exports = reducers;
export default combReducers;
