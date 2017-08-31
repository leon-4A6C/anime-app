import React from 'react'
import {
    View,
    Text,
    StyleSheet,
} from "react-native"

import uiTheme from "../uiTheme"

export default class Settings extends React.Component {
    render() {
        return (
            <View>
                <Text style={styles.text}>Sorry no settings yet</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontWeight: "bold",
        fontSize: uiTheme.text.fontSize+3,
        textAlign: "center"
    }
})