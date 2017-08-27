import React from "react"
import {
    TouchableHighlight,
    Text,
    StyleSheet,
    View,
} from "react-native"

import uiTheme from "../uiTheme"

export default class Episode extends React.Component {

    _onPress() {
        this.props.onPress(this.props, this.state);
    }

    render() {
        return (
            <TouchableHighlight onPress={this._onPress.bind(this)} underlayColor="white">
                <View style={styles.container}>
                    <Text style={styles.title}>episode {this.props.episodeNumber}</Text>
                    <Text style={styles.name}>{this.props.episodeName}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        margin: 5,
        minHeight: 40
    },
    title: {
        fontSize: uiTheme.text.fontSize+1,
        fontWeight: "bold"
    },
    name: {
        fontWeight: "100",
        fontSize: uiTheme.text.fontSize-2
    }
});