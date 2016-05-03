import React, {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    DeviceEventEmitter
} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { connect } from 'react-redux'
import { updateSelectedFeelDescription, addFeel } from '../actions';


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
        alignItems:'stretch'
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
        this.setState({visibleHeight: Dimensions.get('window').height})
    }

    handleType(description, currentFeel) {
        //debounce this? or maybe just handle onBlur
        this.props.dispatch(updateSelectedFeelDescription(description, currentFeel));
    }

    handleDone() {
        this.props.dispatch(addFeel());
        this.props.dispatch(Actions.logScreen);
    }

    render(){
        const { feels } = this.props;
        const latestFeel = feels[feels.length - 1];

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
                    onPress={() => this.handleDone()}
                > 
                    Done
                </Button>
            </View>
        );
    }
}

export default connect((state) => state)(InputDescription);