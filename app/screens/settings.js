import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button,
    ToastAndroid
} from "react-native"
import { connect } from "react-redux";
import { update } from "../actions"

import uiTheme from "../uiTheme"

class Settings extends React.Component {

    componentDidUpdate(prevProps) {

        console.log(this.props.update)

        if(this.props.update.isFetching) {
            ToastAndroid.show('checking for updates...', ToastAndroid.SHORT); 
        }

        if(prevProps.update.isFetching && !this.props.update.isFetching) {
            if(this.props.update.update) {
                ToastAndroid.show('downloading update', ToastAndroid.SHORT);    
            } else {
                ToastAndroid.show("no new update found :(", ToastAndroid.SHORT);
            }
        }

    }

    update() {
        this.props.checkUpdate();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.updateButton}>
                    <Button
                        onPress={this.update.bind(this)}
                        title="update"
                        color={uiTheme.palette.secundaryColor}
                        accessibilityLabel="check and download updates"
                    />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        update: state.update,
    }
}
function mapActionToProps(dispatch) {
    return {
        checkUpdate: () => dispatch(update.update()),
    }
}

export default connect(mapStateToProps, mapActionToProps)(Settings);

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    text: {
        fontWeight: "bold",
        fontSize: uiTheme.text.fontSize+3,
        textAlign: "center"
    },
    updateButton: {
        height: 50,
    }
})