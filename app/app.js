'use strict'

import React, {
  View,
  Text,
  Navigator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  bindActionCreators
} from 'redux';
import { connect, Provider } from 'react-redux';
import {
  Router,
  Scene,
  TabBar,
  Modal,
  Schema,
  Actions,
  Reducer
} from 'react-native-router-flux';
import SelectScreen from './containers/SelectScreen';
import InputDescriptionScreen from './containers/InputDescriptionScreen';
import LogScreen from './containers/LogScreen';
import LoadingScreen from './containers/LoadingScreen';
import * as AppActions from './actions'
const RouterWithRedux = connect()(Router);
// import reducers from './reducers';
// const middleware = //thunks
// const store = compose()(createStore)(reducers);

// const reducerCreate = params=>{
//     const defaultReducer = Reducer(params);
//     return (state, action)=>{
//         console.log("ACTION:", action);
//         return defaultReducer(state, action);
//     }
// };

class App extends React.Component {
  render() {
    const { feels, routes } = this.props;
    if (this.props.loading) {
      return (
        <LoadingScreen />
      )
    }
    return (
      <RouterWithRedux sceneStyle={ {backgroundColor: '#5D2757'} }>
        <Scene key="rootNav">
          <Scene
            key="selectScreen"
            component={SelectScreen}
            title="Tap an emoji to log how you feel"
            initial={true}
            hideNavBar={true}
            type={"reset"} 
            feels={feels}
            routes={routes}/>
          <Scene
            key="inputDescriptionScreen"
            component={InputDescriptionScreen}
            title="Want to elaborate?"
            hideNavBar={true}
            renderRightButton={()=> {}}
            rightTitle="Right"
            feels={feels}/>
          <Scene
            key="logScreen"
            component={LogScreen}
            title="Your Feels"
            hideNavBar={true}
            type={"reset"}
            feels={feels}/>
        </Scene>
      </RouterWithRedux>
    )
  }
}

function mapStateToProps(state) {
  return {
    feels: state.feels,
    routes: state.routes,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
