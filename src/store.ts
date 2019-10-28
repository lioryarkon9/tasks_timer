import { createStore, compose, applyMiddleware } from 'redux';
import { RESTORE_LOCAL_STORAGE_KEY } from 'constants/restore.constants';

import rootReducer from 'reducers/root.reducer';
import apiMiddleware from 'middlewares/api.middleware';
import intervalMiddleware from 'middlewares/interval.middleware';
import validateTaskNameMiddleware from 'middlewares/validateTaskName.middleware';

const isDev = process.env.NODE_ENV !== 'production';

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): void;
};

const composeEnhancers =
  (isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middlewares = [
  apiMiddleware,
  intervalMiddleware,
  validateTaskNameMiddleware
];

if (isDev) {
  middlewares.push(require('redux-freeze'));
}

const savedState = localStorage.getItem(RESTORE_LOCAL_STORAGE_KEY);

const store = createStore(
  rootReducer,
  ...(savedState && isDev ? [JSON.parse(savedState)] : []),
  // @ts-ignore
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
