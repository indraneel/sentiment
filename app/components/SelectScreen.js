import React, {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { connect } from 'react-redux'

import { addFeel, selectFeel } from '../actions';

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

                // <Text style={styles.bigText}>
                //     How do you feel?
                // </Text>
    render() {
        const { feels } = this.props;
        const latestFeelId = feels.length-1 >= 0 ? feels.length-1 : 0;

        return (
            <View style={styles.container}>
                <View style={ {flex:1, flexDirection:'row', justifyContent: 'space-around'} }>
                    <Button
                        style={styles.bigEmoji}
                        onPress={() => this.handleSelection('😊', latestFeelId)}
                        label="great"
                    >
                        😊
                    </Button>
                    <Button
                        style={styles.bigEmoji}
                        onPress={() => this.handleSelection('😒', latestFeelId)}
                        label="annoyed"
                    >
                        😒
                    </Button>
                </View>
                <View style={ {flex:1, flexDirection:'row', justifyContent: 'space-around'} }>
                    <Button
                        style={styles.bigEmoji}
                        onPress={() => this.handleSelection('👍', latestFeelId)}
                        label="good"
                    >
                        👍
                    </Button>
                    <Button
                        style={styles.bigEmoji}
                        onPress={() => this.handleSelection('🙁', latestFeelId)}
                        label="sad"
                    >
                        🙁
                    </Button>
                </View>
                <View style={ {flex:1, flexDirection:'row', justifyContent: 'space-around'} }>
                    <Button
                        style={styles.bigEmoji}
                        onPress={() => this.handleSelection('🙏', latestFeelId)}
                        label="blessed"
                    >
                        🙏
                    </Button>
                    <Button
                        style={styles.bigEmoji}
                        onPress={() => this.handleSelection('😡', latestFeelId)}
                        label="angry"
                    >
                        😡
                    </Button>
                </View>

            </View>
        );
    }
}

export default connect((state) => state)(SelectScreen);