'use strict'

import React, { View, Text, AsyncStorage } from 'react-native';
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate, getStoredState } from 'redux-persist';
import devTools from 'remote-redux-devtools';

import LoadingScreen from './app/containers/LoadingScreen'
import rootReducer from './app/reducers/index'
import App from './app/app'
import Persistor from './app/utils/persistor'

const logger = createLogger()
// const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)
// const store = createStoreWithMiddleware(rootReducer)

const enhancer = compose(
    applyMiddleware(thunk),
    // autoRehydrate(),
    devTools()
  );
  // Note: passing enhancer as last argument requires redux@>=3.1.0
let store = createStore(rootReducer, enhancer);
// let store = null;

// persistStore(store, {storage: AsyncStorage}, (err, state) => {
//     console.log("persist-store: restored");
//     console.log(state);
// }).purgeAll();

let persistor = null;

class wrapper extends React.Component { 
    constructor(props) {
        super(props);
        this.persistedStore = {};
        this.state = { rehydrated: false };
    }

    getChildContext() {
        return { persistor: persistor }
    }

    componentWillMount() {
        persistor = persistStore(store, {storage: AsyncStorage}, () => {
            console.log(store);
            this.setState({ rehydrated: true});
        })
    }

    render() {
        if (!this.state.rehydrated) {
            return (
                <LoadingScreen />
            )
        }
        return (
            <Provider store={store}>
                <App loading={false} />
            </Provider>
        )
    }
}

wrapper.childContextTypes = { 
    persistor: React.PropTypes.func.isRequired
}

export default wrapper
