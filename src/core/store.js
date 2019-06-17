import { createStore } from 'redux'
import action from './action';
import reducer from './reducer';

const store = window.__REDUX_DEVTOOLS_EXTENSION__ ?
  createStore(reducer, window.window.__REDUX_DEVTOOLS_EXTENSION__()) :
  createStore(reducer);

export default store;
