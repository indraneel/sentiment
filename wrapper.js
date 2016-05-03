'use strict'

import React, { AsyncStorage } from 'react-native';
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import devTools from 'remote-redux-devtools';

import rootReducer from './app/reducers/index'
import App from './app/app'

const logger = createLogger()
// const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)
// const store = createStoreWithMiddleware(rootReducer)

const enhancer = compose(
    applyMiddleware(thunk),
    autoRehydrate(),
    devTools()
  );
  // Note: passing enhancer as last argument requires redux@>=3.1.0
const store = createStore(rootReducer, enhancer);
persistStore(store, {storage: AsyncStorage}, () => {
    console.log("persist-store: restored")
});

const wrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default wrapper
