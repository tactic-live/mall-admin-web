import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import action from './action';
import rootReducer from './reducer';

const middlewares = [];
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}
const composeEnhancers = process.env.NODE_ENV === 'production' ? compose :
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);

// 调用日志打印方法
const logger = createLogger({
  diff: false
});

const middleware = process.env.NODE_ENV === 'production' ? [thunk] : [thunk, logger];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
