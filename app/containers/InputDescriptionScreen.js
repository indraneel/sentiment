import React, {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    AsyncStorage,
    DeviceEventEmitter
} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { connect } from 'react-redux'
import { updateSelectedFeelDescription, addFeel } from '../actions';
import { persistStore } from 'redux-persist'
import logLocalStore from '../utils/logLocalStore'

const {
    State: TextInputState
} = TextInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5D2757",
        paddingTop: 44
    },
    inputContainer: {
        flex:1,
        flexDirection:'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 44
    },
    bigText: {
        fontFamily: "PT Sans",
        fontSize:54,
        fontWeight: "bold",
        color:'#FCF1F9',
        justifyContent:'center'
    },
    bigEmoji: {
        fontSize:120,
        fontWeight: "bold",
    },
    descriptionEditor: {
        height:100,
        width:300,
        backgroundColor:'white',
        borderColor: 'white',
        borderWidth: 1,
        alignItems:'stretch',
        fontSize: 24,
    },
    nextButtonContainer: {
        width: Dimensions.get('window').width,
        height: 66,
        backgroundColor: "#F667E6"
    },
    nextButtonText: {
        fontSize: 36,
        color: "white",
        justifyContent: "center",
        alignItems: "center",
    }
});

class InputDescription extends React.Component {
    contextTypes
    constructor(props) {
        super(props);
        this.state = {
            visibleHeight: Dimensions.get('window').height
        }
    }
    componentWillMount () {
        DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
        DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
    }

    keyboardWillShow (e) {
        let newSize = Dimensions.get('window').height - e.endCoordinates.height
        this.setState({visibleHeight: newSize})
    }

    keyboardWillHide (e) {
        // this.setState({visibleHeight: Dimensions.get('window').height})
    }

    handleType(description, currentFeel) {
        //debounce this? or maybe just handle onBlur
        this.props.dispatch(updateSelectedFeelDescription(description, currentFeel));
    }

    handleDone(latestFeelId) {
        TextInputState.blurTextInput(TextInputState.currentlyFocusedField());
        this.props.dispatch(addFeel(latestFeelId));
        this.props.dispatch(Actions.logScreen);
        console.log("state before\n~~\n", this.context.store.getState());
        console.log("localstore before\n~~\n");
        logLocalStore();
        persistStore(this.context.store, {storage: AsyncStorage}, (err, state) => {
            console.log("IDS - cWU - persisted");
            logLocalStore();
        });
    }

    render(){
        const { feels } = this.props;
        const latestFeel = feels[feels.length - 1];
        const latestFeelId = feels.length-1 >= 0 ? feels.length-1 : 0;

        return (
            <View style={[{'height': this.state.visibleHeight}, styles.container ]}>
                <View style={styles.inputContainer}>
                    <Text
                        style={styles.bigText}
                    >
                        {latestFeel.type}
                    </Text>
                    <TextInput
                        style={styles.descriptionEditor}
                        onChangeText={(text) => this.handleType(text, latestFeel)}
                        placeholder={"If you'd like, you can write about how you feel right now, to help remember it later!"}
                        multiline={true}
                        selectionColor={"#5D2757"}
                        value={latestFeel.description}
                    />
                </View>
                <Button
                    containerStyle={styles.nextButtonContainer}
                    style={styles.nextButtonText}
                    onPress={() => this.handleDone(latestFeelId)}
                > 
                    Done
                </Button>
            </View>
        );
    }
}

InputDescription.contextTypes = {
  store: React.PropTypes.object.isRequired,
  persistor: React.PropTypes.object.isRequired
};

export default connect((state) => state)(InputDescription);