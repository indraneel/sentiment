import React, {
    View,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
} from "react-native";

import Button from 'react-native-button';
import supportedEmojis from '../config/emojis';
import { styles } from './EmojiPicker.styles.js';

class EmojiPicker extends React.Component {
    generatePickerViews() {
        let content = [];
        let rowCount = 0;
        supportedEmojis.map((value) => {
            if (rowCount === 2) {}
        });

    }

    render() {
        return (
            <ScrollView>
                <View style={styles.emojiRow}>
                    <Button
                        style={styles.bigEmoji}
                        onPress={() => this.props.handleSelection('😊', this.props.latestFeelId)}
                        label="great"
                    >
                        😊
                    </Button>
                    <Button
                        style={styles.bigEmoji}
                        onPress={() => this.props.handleSelection('😒', this.props.latestFeelId)}
                        label="annoyed"
                    >
                        😒
                    </Button>
                </View>
                <View style={styles.emojiRow}>
                    <Button
                        style={styles.bigEmoji}
                        onPress={() => this.props.handleSelection('👍', this.props.latestFeelId)}
                        label="good"
                    >
                        👍
                    </Button>
                    <Button
                        style={styles.bigEmoji}
                        onPress={() => this.props.handleSelection('🙁', this.props.latestFeelId)}
                        label="sad"
                    >
                        🙁
                    </Button>
                </View>
                <View style={styles.emojiRow}>
                    <Button
                        style={styles.bigEmoji}
                        onPress={() => this.props.handleSelection('🙏', this.props.latestFeelId)}
                        label="blessed"
                    >
                        🙏
                    </Button>
                    <Button
                        style={styles.bigEmoji}
                        onPress={() => this.props.handleSelection('😡', this.props.latestFeelId)}
                        label="angry"
                    >
                        😡
                    </Button>
                </View>
                <View style={styles.emojiRow}>
                    <Button
                        style={styles.bigEmoji}
                        onPress={() => this.props.handleSelection('🙏', this.props.latestFeelId)}
                        label="blessed"
                    >
                        🙏
                    </Button>
                    <Button
                        style={styles.bigEmoji}
                        onPress={() => this.props.handleSelection('😡', this.props.latestFeelId)}
                        label="angry"
                    >
                        😡
                    </Button>
                </View>
            </ScrollView>
        )
    }
}

export default EmojiPicker;