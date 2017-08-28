import React, {
    Component
} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Slider,
    Animated,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
    ToastAndroid
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';

import uiTheme from "../uiTheme"
  
export default class VideoPlayer extends Component {
  
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
    };
  
    onLoad = (data) => {
        this.setState({
            duration: data.duration,
            paused: !this.state.paused,
        });
    };
  
    onProgress = (data) => {
        this.setState({
            currentTime: data.currentTime,
        });
    };
  
    onEnd = () => {
        this.setState({
            paused: true,
        })
        this.video.seek(0)
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
        const minutes = parse(parseInt(duration/60));
        const hours = parseInt(minutes/60);
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
                duration: 200
            }
        ).start();
        this.setState({
            controls: !this.state.controls
        })
    }
  
    render() {
        const params = this.props.navigation.state.params || {};
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => this.toggleControls()}>
                    <Video
                        ref={(ref) => { this.video = ref }}
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

                <Animated.View style={[styles.controlsTop, styles.controls, {transform: [{translateY: Animated.multiply(this.state.controlsPosition, new Animated.Value(-1))}], opacity: this.state.controlsOpacity}]}>
                    <View style={[styles.leftControls, styles.topLeftControls]}>
                        <Text style={styles.text}>{params.title}</Text>
                    </View>
                    <View style={[styles.rightControls, styles.topRightControls]}>
                        <View style={styles.optionIcon}>
                            <TouchableNativeFeedback
                                onPress={() => ToastAndroid.showWithGravity('not yet implemented', ToastAndroid.SHORT, ToastAndroid.CENTER)}
                                background={TouchableNativeFeedback.Ripple("#fff")}
                                useForeground={true}
                            >
                                <Icon style={styles.text} name="more-vert" size={28} />
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </Animated.View>

                <Animated.View style={[styles.controls, styles.controlsBottom, {transform: [{translateY: this.state.controlsPosition}], opacity: this.state.controlsOpacity}]}>
                    <View style={styles.leftControls}>
                        <Icon 
                            onPress={() => this.setState({paused: !this.state.paused})}
                            style={styles.text}
                            name={this.state.paused ? "play-arrow" : "pause"}
                            size={32}/>
                    </View>
                    <View style={styles.centerControls}>
                        <Text style={styles.text}>
                            {this.time(this.state.currentTime)}
                        </Text>
                        <Slider
                            onValueChange={(value) => {this.video.seek(value)}}
                            maximumValue={this.state.duration}
                            value={this.state.currentTime}
                            style={styles.slider}/>
                        <Text style={styles.text}>
                            {this.time(this.state.duration)}
                        </Text>
                    </View>
                    <View style={styles.rightControls}>
                        <Icon 
                            onPress={() => {this.setState({fullscreen: !this.state.fullscreen}); ToastAndroid.showWithGravity('not yet implemented', ToastAndroid.SHORT, ToastAndroid.CENTER)}}
                            style={styles.text}
                            name={this.state.fullscreen ? "fullscreen-exit" : "fullscreen"}
                            size={32}/>
                    </View>
                </Animated.View>

            </View>
        );
    }
}
  
  
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
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        left: 20,
        right: 20,
        flexDirection: "row"
    },
    controlsBottom: {
        bottom: 20,
    },
    text: {
        color: uiTheme.palette.textColor,
        flex: 1,
        fontWeight: "bold",
    },
    slider: {
        flex: 10
    },
    leftControls: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    rightControls: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    centerControls: {
        flex: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    controlsTop: {
        top: 20,
    },
    topLeftControls: {
        flex: 9,
    },
    topRightControls: {
        justifyContent: "flex-end",
    },
    optionIcon: {
        
    },
});