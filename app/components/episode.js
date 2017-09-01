import React from "react"
import {
    TouchableHighlight,
    Text,
    StyleSheet,
    View,
} from "react-native"
import { IconButton } from "./"

import uiTheme from "../uiTheme"

export default class Episode extends React.Component {

    state = {
        downloaded: false,
        watched: false,
    }

    componentDidMount = () => {
        this.setState({
            downloaded: this.props.downloaded,
            watched: this.props.watched,
        })
    }
    

    _onPress() {
        this.props.onPress(this.props, this.state);
    }

    _onDownload() {
        if(this.state.downloaded) {
            this.props.onDeleteDownload(this.props, this.state);
        } else {
            this.props.onDownload(this.props, this.state);
        }
        this.setState({downloaded: !this.state.downloaded})
    }

    _onWatch() {

        if(this.state.watched) {
            this.props.onDeleteWatch(this.props, this.state);
        } else {
            this.props.onWatch(this.props, this.state);            
        }

        this.setState({watched: !this.state.watched})
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.left} onPress={this._onPress.bind(this)} underlayColor="white">
                    <View>
                        <Text style={styles.title}>episode {this.props.episode.episode}</Text>
                        <Text style={styles.name}>{this.props.episodeName}</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.right}>
                    {
                        this.state.downloaded ?
                        <IconButton
                            iconPack="MaterialIcons"
                            name="delete"
                            size={25}
                            onPress={this._onDownload.bind(this)}
                            style={styles.iconContainer}
                            iconStyle={styles.iconDisabled}
                    /> : null
                    }
                    <IconButton
                        iconPack="MaterialIcons"
                        name="file-download"
                        size={25}
                        onPress={this._onDownload.bind(this)}
                        style={styles.iconContainer}
                        iconStyle={this.state.downloaded ? styles.icon : styles.iconDisabled}
                    />
                    <IconButton
                        iconPack="MaterialIcons"
                        name="check"
                        size={25}
                        onPress={this._onWatch.bind(this)}
                        style={styles.iconContainer}
                        iconStyle={this.state.watched ? styles.icon : styles.iconDisabled}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    left: {
        flex: 2.7,
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    right: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 12,
    },
    title: {
        fontSize: uiTheme.text.fontSize+1,
        fontWeight: "bold"
    },
    name: {
        fontWeight: "100",
        fontSize: uiTheme.text.fontSize-2
    },
    iconContainer: {
        marginLeft: 10,
    },
    icon: {
        color: uiTheme.palette.primaryColor,
    },
    iconDisabled: {
        color: uiTheme.palette.secundaryLight,
    }
});