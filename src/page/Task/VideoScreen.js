import React, {
    Component
} from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    Alert,
    BackHandler
} from 'react-native';

import Video from 'react-native-video';

function formatTime(second) {
    let h = 0, i = 0, s = parseInt(second);
    if (s > 60) {
        i = parseInt(s / 60);
        s = parseInt(s % 60);
    }
    // 补零
    let zero = function (v) {
        return (v >> 0) < 10 ? "0" + v : v;
    };
    console.log([zero(h), zero(i), zero(s)].join(":"));
    // return [zero(h), zero(i), zero(s)].join(":");
    return zero(s);
}

export default class VideoScreen extends Component {

    static navigationOptions = {
        header: null
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            tag: 1,
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
        };
    }


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        this.params = this.props.navigation.state.params;
        console.log(this.state.tag + "lamb");

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        this.props.navigation.goBack();
        return true;
    };


    onLoad = (data) => {
        this.setState({duration: data.duration});
        console.log(data.duration + "xxx");
    };

    // returnData(tag) {
    //     this.setState({tag: tag});
    // }

    onProgress = (data) => {
        this.setState({currentTime: data.currentTime});
        console.log(data.currentTime + "hhh");
        this.params = this.props.navigation.state.params;
        console.log(this.state.tag + "lam");
        console.log(this.state.duration * 0.1 + "sss");
        if (data.currentTime > this.state.duration * 0.1 && this.state.tag !== 2) {
            this.setState({paused: !this.state.paused});
            Alert.alert('您需要分享App才能继续观看视频哦', '请选择', [
                {
                    text: '取消', onPress: () => {
                        this.props.navigation.goBack();
                        this.setState({
                            paused: this.state.paused
                        })
                    }
                },
                {
                    text: '分享', onPress: () => {
                        this.props.navigation.navigate('Share', {
                            returnData: (tag) => {
                                this.setState({tag: tag});
                            }
                        });
                    }
                },
            ]);
        }
    };

    onEnd = () => {
        this.setState({paused: true});
        this.video.seek(0)
    };

    onAudioBecomingNoisy = () => {
        this.setState({paused: true})
    };

    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
        this.setState({paused: !event.hasAudioFocus})
    };

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };


    render() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.fullScreen}
                    onPress={() => this.setState({paused: !this.state.paused})}>
                    <Video
                        ref={(ref: Video) => {
                            this.video = ref
                        }}
                        /* For ExoPlayer */
                        source={require('../../assets/background.mp4')}
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
                </TouchableOpacity>
                <View style={styles.textStyle}>
                    <Text style={styles.volumeControl}
                          onPress={() => this.setState({paused: false})}>
                        {formatTime(this.state.duration - this.state.currentTime)}
                    </Text>

                    <Button
                        style={styles.btnStyle} title={'关闭广告'} color={'#73808080'}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}/>
                </View>

                <View style={styles.controls}>
                    <View style={styles.progress}>
                        <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]}/>
                        <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]}/>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    textStyle: {
        paddingLeft: 10,
        paddingTop: 25,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    btnStyle: {
        paddingRight: 10,
        paddingTop: 25,
        justifyContent: 'flex-end',
        flexDirection: 'row',
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
        bottom: 20,
        left: 20,
        right: 20,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
    volumeControl: {
        fontSize: 25,
        color: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
