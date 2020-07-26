import { createStore, applyMiddleware } from 'redux';
import createDebounce from 'redux-debounced';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const middlewares = [thunk, createDebounce()];

export const store = createStore(
  rootReducer,
  {},
  applyMiddleware(...middlewares)
);
