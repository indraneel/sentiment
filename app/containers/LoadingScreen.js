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

class LoadingScreen extends React.Component {
    componentWillUnmount() {
        setTimeout(() => {
            return;
        }, 5000);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={ {flex:1, flexDirection:'row', justifyContent: 'space-around'} }>
                    <Text>Loading...</Text>
                </View>
            </View>
        );
    }
}

export default LoadingScreen;