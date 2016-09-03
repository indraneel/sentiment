import React, {
    AsyncStorage,
} from "react-native";

export default () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
       stores.map((result, i, store) => {
         // get at each store's key/value so you can work with it
         let key = store[i][0];
         let value = store[i][1];
         console.log("key|val", key, "|", value);
        });
      });
    });
}