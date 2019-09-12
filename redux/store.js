import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import helenaDelirium from './reducers';

const logger = createLogger({
  collapsed: true,
  actionTransformer: (action) => ({
    ...action,
    type: String(action.type),
  }),
});

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(helenaDelirium);

export default store;
