import React,{ 
    View,
    Text,
    StyleSheet,
    ListView,
    Dimensions,
    AsyncStorage
} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux'
// import rows from '../data';
import rowGenerator from '../utils/rowGenerator';
import { persistStore, autoRehydrate } from 'redux-persist';
import { clearAllFeels } from '../actions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5D2757",
    },
    statusbar: {
        backgroundColor: '#fff',
        height: 66,
    },
    navbar: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        justifyContent: 'center',
        height: 44,
    },
    navbarTitle: {
        color: '#444',
        fontSize: 16,
        fontWeight: "500",
    },
    listView: {
        width: Dimensions.get('window').width
    },
    li: {
        backgroundColor: '#5D2757',
        borderBottomColor: '#B94EB0',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 24,
        paddingTop: 14,
        paddingBottom: 24,
      },
    liContainer: {
        flex: 2,
    },
    liText: {
        color: '#fff',
        fontSize: 16,
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

let rows = [];

class LogScreen extends React.Component {

    constructor(props) {
        super(props);
        const { feels } = this.props;
        rows = rowGenerator(feels);
        let ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true})
        this.state = {
            dataSource: ds.cloneWithRows(rows),
            scrollEnabled: true
        }
    }

    // componentWillMount() {
    //     persistStore(store, {storage: AsyncStorage}, (err, state) => {
    //         this.setState({ rehydrated: true })
    //     });
    // }

    allowScroll(scrollEnabled) {
        this.setState({ scrollEnabled: scrollEnabled })
    }

    handleSwipeout(sectionID, rowID) {
        for (var i = 0; i < rows.length; i++) {
            if (i != rowID) {
                rows[i].active = false
            }
            else {
                rows[i].active = true
            }
        }
        updateDataSource(rows)
    }

    updateDataSource(data) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data)
        })
    }

    renderRow(rowData: string, sectionID: number, rowID: number) {
        return <Swipeout
            left={rowData.left}
            right={rowData.right}
            rowID={rowID}
            sectionID={sectionID}
            autoClose={rowData.autoClose}
            backgroundColor={rowData.backgroundColor}
            close={!rowData.active}
            >
              <View style={styles.li}>
                <Text style={styles.liText}>{rowData.text}</Text>
              </View>
            </Swipeout>
    }

    clearAll() {
        this.context.persistor.purgeAll();
        this.props.dispatch(clearAllFeels());
        rows = rowGenerator(this.props.feels);
        this.updateDataSource(rows);
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.statusbar}/>
                <ListView
                  scrollEnabled={this.state.scrollEnabled}
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow}
                  style={styles.listView}/>
                <Button
                    containerStyle={styles.nextButtonContainer}
                    style={styles.nextButtonText}
                    onPress={() => this.props.dispatch(Actions.selectScreen)}
                > 
                    Log your mood
                </Button>
                <Button
                    containerStyle={styles.nextButtonContainer}
                    style={styles.nextButtonText}
                    onPress={() => this.clearAll() }
                > 
                    Purge
                </Button>

            </View>
        );
    }
}

LogScreen.contextTypes = {
  persistor: React.PropTypes.object.isRequired
};

export default connect((state) => state)(LogScreen);