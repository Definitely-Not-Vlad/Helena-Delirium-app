import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import helenaDelirium from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, helenaDelirium);

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

export default () => {
  const store = compose(
    applyMiddleware(...middlewares)
  )(createStore)(persistedReducer);
  const persistor = persistStore(store);

  return { store, persistor }
}
