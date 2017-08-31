import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Slider,
    Animated,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
    ToastAndroid,
    ActivityIndicator,
    StatusBar,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Orientation from 'react-native-orientation';
import { Immersive } from 'react-native-immersive';
import LinearGradient from "react-native-linear-gradient"
import KeepAwake from 'react-native-keep-awake';
import { connect } from "react-redux"

import { IconButton } from "../components"
import { watched } from "../actions"

import uiTheme from "../uiTheme"
  
class VideoPlayer extends React.Component {
    // put the settings in the more-vert icon button thingy
    state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      paused: true,
      fullscreen: false,
      controlsPosition: new Animated.Value(0), // change this the remove/add the controls
      controlsOpacity: new Animated.Value(1),
      controls: true,
      loading: true,
    };
  
    onLoad = (data) => {
        this.setState({
            duration: data.duration,
            paused: !this.state.paused,
            watched: false,
        });
    };
  
    onProgress = (data) => {
        let loading = false;
        if(data.playableDuration <= data.currentTime) {
            loading = true;
        }
        this.setState({
            currentTime: data.currentTime,
            loading
        });
        if(data.currentTime/this.state.duration >= 0.8 && !this.state.watched) {
            this.props.addWatch(this.props.navigation.state.params.data, this.props.navigation.state.params.episode) // auto save the play
            this.setState({
                watched: true,
            })
        }
    };
  
    onEnd = () => {
        this.setState({
            paused: true,
        })
        this.player.seek(0)
        // todo ask if the user wants to see the next video
    };
  
    onAudioBecomingNoisy = () => {
        this.setState({
            paused: true,
        })
    };
  
    onAudioFocusChanged = (event) => {
        this.setState({
            paused: !event.hasAudioFocus,
        })
    };

    time(duration) {
        const minutes = parse(parseInt(duration/60%60));
        const hours = parseInt(duration/60/60);
        const seconds = parse(parseInt(duration%60));
        if(hours > 0) {
            return `${hours}:${minutes}:${seconds}`
        }
        return minutes+":"+seconds

        function parse(int) {
            if(int < 10) {
                return "0"+int
            }
            return int
        }
    }

    toggleControls() {
        Animated.timing(  // Animate value over time
            this.state.controlsPosition,  // The value to drive
            { 
                toValue: this.state.controls ? 60 : 0,
                duration: 100
            }
        ).start();
        Animated.timing(  // Animate value over time
            this.state.controlsOpacity,  // The value to drive
            { 
                toValue: this.state.controls ? 0 : 1,
                duration: 75
            }
        ).start();
        this.setState({
            controls: !this.state.controls
        })
    }

    componentDidMount() {
        Orientation.lockToLandscape()
    }

    componentWillUnmount() {
        Orientation.unlockAllOrientations()
        Immersive.off()
        Immersive.setImmersive(false)
        StatusBar.setHidden(false)
    }

    toggleFullScreen() {
        if(this.state.fullscreen) {
            Immersive.off()        
            Immersive.setImmersive(false)
            StatusBar.setHidden(false)
        } else {
            Immersive.on()
            Immersive.setImmersive(true)
            StatusBar.setHidden(true)
        }
        this.setState({
            fullscreen: !this.state.fullscreen
        });
    }
  
    render() {
        const params = this.props.navigation.state.params || {};
        return (
            <View style={styles.container}>
                <KeepAwake/>
                <TouchableWithoutFeedback onPress={() => this.toggleControls()}>
                    <Video
                        ref={(ref) => { this.player = ref }}
                        source={{uri: params.video.src || ""}}
                        style={styles.fullScreen}
                        rate={this.state.rate}
                        paused={this.state.paused}
                        volume={this.state.volume}
                        muted={this.state.muted}
                        resizeMode={this.state.resizeMode}
                        onLoad={this.onLoad}
                        onProgress={this.onProgress}
                        onEnd={this.onEnd}
                        onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                        onAudioFocusChanged={this.onAudioFocusChanged}
                        repeat={false}
                    />
                </TouchableWithoutFeedback>

                <View style={[styles.fullScreen, styles.middle]}>
                    {this.state.loading ? <ActivityIndicator size="large"/> : null}
                </View>

                <Animated.View style={[styles.controlsTop, styles.controls, {transform: [{translateY: Animated.multiply(this.state.controlsPosition, new Animated.Value(-1))}], opacity: this.state.controlsOpacity}]}>
                    <View style={[styles.leftControls, styles.topLeftControls]}>
                        <IconButton 
                            onPress={() => this.props.navigation.goBack()}
                            iconPack="MaterialIcons"
                            name="arrow-back"
                            size={24}
                            iconStyle={styles.icon}
                        />
                        <Text style={[styles.text, {textAlign: "left", marginLeft: 15}]}>{params.title}</Text>
                    </View>
                    <View style={[styles.rightControls, styles.topRightControls]}>
                        <IconButton
                            onPress={() => ToastAndroid.showWithGravity('not yet implemented', ToastAndroid.SHORT, ToastAndroid.CENTER)}
                            iconStyle={styles.icon}
                            iconPack="MaterialIcons"
                            name="more-vert"
                            size={28}
                        />
                    </View>
                </Animated.View>

                <Animated.View style={[styles.controls, styles.controlsBottom, {transform: [{translateY: this.state.controlsPosition}], opacity: this.state.controlsOpacity}]}>
                    <View style={styles.leftControls}>
                        <IconButton
                            iconStyle={styles.icon}
                            name={this.state.paused ? "play-arrow" : "pause"}
                            iconPack="MaterialIcons"
                            size={32}
                            onPress={() => this.setState({paused: !this.state.paused})}
                        />
                    </View>
                    <View style={styles.centerControls}>
                        <Text style={styles.text}>
                            {this.time(this.state.currentTime)}
                        </Text>
                        <Slider
                            minimumTrackTintColor={uiTheme.palette.accentColor}
                            maximumTrackTintColor={uiTheme.palette.primaryColor}
                            thumbTintColor={uiTheme.palette.primaryDark}
                            onSlidingComplete={(value) => {this.player.seek(value)}}
                            maximumValue={this.state.duration}
                            value={this.state.currentTime}
                            style={styles.slider}/>
                        <Text style={styles.text}>
                            {this.time(this.state.duration)}
                        </Text>
                    </View>
                    <View style={styles.rightControls}>
                        <IconButton
                            onPress={this.toggleFullScreen.bind(this)}
                            iconStyle={styles.icon}
                            name={this.state.fullscreen ? "fullscreen-exit" : "fullscreen"}
                            iconPack="MaterialIcons"
                            size={28}
                        />
                    </View>
                </Animated.View>

            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addWatch: (item, ep) => dispatch(watched.addWatch(item, ep)),
    }
}
  
export default connect(() => ({}), mapDispatchToProps)(VideoPlayer);
  
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        height: 45,
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        left: 0,
        right: 0,
        flexDirection: "row",
    },
    controlsBottom: {
        bottom: 10,
    },
    text: {
        color: uiTheme.palette.textColor,
        flex: 1,
        fontWeight: "bold",
        textAlign: "center"
    },
    slider: {
        flex: 9
    },
    leftControls: {
        padding: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    rightControls: {
        padding: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    centerControls: {
        padding: 10,
        paddingTop: 15,
        flex: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    controlsTop: {
        top: 10,
    },
    topLeftControls: {
        flex: 9,
    },
    topRightControls: {
        justifyContent: "flex-end",
    },
    icon: {
        color: uiTheme.palette.textColor,
        fontWeight: "bold",
    },
    middle: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
});