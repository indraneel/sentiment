import { persistStore } from 'redux-persist';
import React, { AsyncStorage } from 'react-native';

let config = {
    storage: AsyncStorage
}
let persistorSingleton = {
    instance: persistor
};

/*
    @param
    callback - takes callback function
*/
const persistor = (callback) => {
    return persistStore(store, config, () => {
        console.log(store);
        this.setState({ rehydrated: true});
        callback();
    })
    
}
export default persistorSingleton;
