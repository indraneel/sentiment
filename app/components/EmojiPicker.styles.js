import React, {
    StyleSheet,
} from "react-native";

export const styles = StyleSheet.create({
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
    emojiRow: {
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-around'
    },
});