import React, {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    AsyncStorage,
} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { connect } from 'react-redux'

import { addFeel, selectFeel } from '../actions';
import EmojiPicker from '../components/EmojiPicker';

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        flexDirection: "column",
        backgroundColor: "#5D2757",
        paddingTop: 44,
    },
    bigText: {
        fontFamily: "PT Sans",
        fontSize:54,
        fontWeight: "bold",
        color:'#FCF1F9',
    },
    bigEmoji: {
        fontSize:120,
        fontWeight: "bold",
    },
    nextButtonContainer: {
        width: Dimensions.get('window').width,
        backgroundColor: "#F667E6",
        height: 66
    },
    nextButtonText: {
        fontSize: 36,
        color: "white",
        justifyContent: "center",
        alignItems: "center",
    }
});

class SelectScreen extends React.Component {

    handleSelection(feel, latestFeelId) {
        this.props.dispatch(selectFeel(feel, latestFeelId));
        this.props.dispatch(Actions.inputDescriptionScreen);
    }

    componentDidMount() {
        // this.logLocalStore();
    }

    logLocalStore() {
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

    render() {
        const { feels } = this.props;
        const latestFeelId = feels.length-1 >= 0 ? feels.length-1 : 0;

        return (
            <View style={styles.container}>
                <EmojiPicker
                    handleSelection={this.handleSelection}
                    latestFeelId={latestFeelId}
                />
                <Button
                    containerStyle={styles.nextButtonContainer}
                    style={styles.nextButtonText}
                    onPress={() => this.props.dispatch(Actions.logScreen)}
                > 
                    View mood history
                </Button>
            </View>
        );
    }
}

SelectScreen.contextTypes = {
  persistor: React.PropTypes.object.isRequired
};

export default connect((state) => state)(SelectScreen);