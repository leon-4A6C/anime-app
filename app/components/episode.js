import React from "react"
import {
    TouchableHighlight,
    Text,
    StyleSheet,
    View,
} from "react-native"

export default class Episode extends React.Component {

    _onPress() {
        this.props.onPress(this.props, this.state);
    }

    render() {
        return (
            <TouchableHighlight onPress={this._onPress.bind(this)} underlayColor="white">
                <View>
                    <Text style={styles.title}>episode {this.props.episodeNumber}</Text>
                    <Text style={styles.name}>{this.props.episodeName}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    title: {

    },
    name: {

    }
});