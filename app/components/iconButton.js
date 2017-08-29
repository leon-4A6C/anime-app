import React from "react";
import {
    View,
    TouchableNativeFeedback
} from "react-native";

import * as Icons from "../icons";

export default class IconButton extends React.Component {
    render() {
        const Icon = Icons[this.props.iconPack];
        return (
            <View style={this.props.style || null}>
                <TouchableNativeFeedback
                    delayPressIn={0}
                    onPress={this.props.onPress}
                    background={this.props.effect || TouchableNativeFeedback.Ripple("#fff", true)}
                >
                    <View>
                        <Icon style={this.props.iconStyle || null} name={this.props.name} size={this.props.size} />
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}