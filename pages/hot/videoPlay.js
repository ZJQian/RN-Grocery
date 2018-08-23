/**
 * Created by zjqian on 2018/8/22.
 */
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    Slider,
    Button,
    TouchableOpacity,
    LayoutAnimation
} from 'react-native';

import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import NavBar from '../../common/NavBar';

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
    return [zero(h), zero(i), zero(s)].join(":");
}


const {width, height} = Dimensions.get('window')

export default class VideoPlay extends Component {

    static navigationOptions =  {
        header: null
    };

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        const item = navigation.getParam('item')
        this.state={
            itemInfo: item,
            headerTitle: item['data']['title'],
            videoWidth: width,
            videoHeight: width*217/375,
            videoCover: item['data']['cover']['feed'],
            videoUrl: item['data']['playUrl'],
            showVideoCover: true,    // 是否显示视频封面
            showVideoControl: false, // 是否显示视频控制组件
            isPlaying: false,        // 视频是否正在播放
            currentTime: 0,        // 视频当前播放的时间
            duration: 0,           // 视频的总时长
            isFullScreen: false,     // 当前是否全屏显示
            playFromBeginning: false, // 是否从头开始播放
        }
    }

    render() {
        return (

            <View style={styles.container} onLayout={this._onLayout}>
                {
                    this.state.isFullScreen ? null
                        :
                        <NavBar title={this.state.headerTitle} leftIcon={require('../../image/nav/nav/nav_icon_back2.png')} leftPress={() => this.props.navigation.goBack()}/>
                }
                <View style={{backgroundColor: '#000000',width: this.state.videoWidth,height: this.state.videoHeight}}>
                    <Video
                        ref={(ref) => this.videoPlayer = ref}
                        source={{uri: this.state.videoUrl}}
                        rate={1.0}
                        volume={1.0}
                        muted={false}
                        paused={!this.state.isPlaying}
                        resizeMode={'contain'}
                        playWhenInactive={false}
                        playInBackground={false}
                        ignoreSilentSwitch={'ignore'}
                        progressUpdateInterval={250.0}
                        onLoadStart={this._onLoadStart}
                        onLoad={this._onLoaded}
                        onProgress={this._onProgressChanged}
                        onEnd={this._onPlayEnd}
                        onError={this._onPlayError}
                        onBuffer={this._onBuffering}
                        style={{width: this.state.videoWidth, height: this.state.videoHeight}}
                    />
                    {
                        this.state.showVideoCover ?
                            <Image
                                style={{
                                    position:'absolute',
                                    top: 0,
                                    left: 0,
                                    width: this.state.videoWidth,
                                    height: this.state.videoHeight
                                }}
                                resizeMode={'cover'}
                                source={{uri: this.state.videoCover}}
                            /> : null
                    }

                    <TouchableWithoutFeedback onPress={() => { this.hideControl() }}>
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: this.state.videoWidth,
                                height: this.state.videoHeight,
                                backgroundColor: this.state.isPlaying ? 'transparent' : 'rgba(0, 0, 0, 0.2)',
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                            {
                                this.state.isPlaying ? null :
                                    <TouchableWithoutFeedback onPress={() => { this.onPressPlayButton() }}>
                                        <Image
                                            style={styles.playButton}
                                            source={require('../../image/video/icon_video_play.png')}
                                        />
                                    </TouchableWithoutFeedback>
                            }
                        </View>
                    </TouchableWithoutFeedback>

                    {
                        this.state.showVideoControl ?
                            <View style={[styles.control, {width: this.state.videoWidth}]}>
                                <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlPlayPress() }}>
                                    <Image
                                        style={styles.playControl}
                                        source={this.state.isPlaying ? require('../../image/video/icon_control_pause.png') : require('../../image/video/icon_control_play.png')}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.time}>{formatTime(this.state.currentTime)}</Text>
                                <Slider
                                    style={{flex: 1}}
                                    maximumTrackTintColor={'#999999'}
                                    minimumTrackTintColor={'#00c06d'}
                                    thumbImage={require('../../image/video/icon_control_slider.png')}
                                    value={this.state.currentTime}
                                    minimumValue={0}
                                    maximumValue={this.state.duration}
                                    onValueChange={(currentTime) => { this.onSliderValueChanged(currentTime) }}
                                />
                                <Text style={styles.time}>{formatTime(this.state.duration)}</Text>
                                <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlShrinkPress() }}>
                                    <Image
                                        style={styles.shrinkControl}
                                        source={this.state.isFullScreen ? require('../../image/video/icon_control_shrink_screen.png') : require('../../image/video/icon_control_full_screen.png')}
                                    />
                                </TouchableOpacity>
                            </View> : null
                    }

                </View>
                <Text>hello</Text>
            </View>



        )
    };

    /// -------Video组件回调事件-------

    _onLoadStart = () => {
        console.log('视频开始加载');
    };

    _onBuffering = () => {
        console.log('视频缓冲中...')
    };

    _onLoaded = (data) => {
        console.log('视频加载完成');
        this.setState({
            duration: data.duration,
        });
    };

    _onProgressChanged = (data) => {
        console.log('视频进度更新');
        if (this.state.isPlaying) {
            this.setState({
                currentTime: data.currentTime,
            })
        }
    };

    _onPlayEnd = () => {
        console.log('视频播放结束');
        this.setState({
            currentTime: 0,
            isPlaying: false,
            playFromBeginning: true
        });
    };

    _onPlayError = () => {
        console.log('视频播放失败');
    };

    ///-------控件点击事件-------

    /// 控制播放器工具栏的显示和隐藏
    hideControl() {
        if (this.state.showVideoControl) {

            this.setState({
                showVideoControl: false,
            })
        } else {
            this.setState(
                {
                    showVideoControl: true,
                },
                // 5秒后自动隐藏工具栏
                () => {
                    setTimeout(
                        () => {
                            this.setState({
                                showVideoControl: false
                            })
                        }, 5000
                    )
                }
            )
        }
    }

    /// 点击了播放器正中间的播放按钮
    onPressPlayButton() {
        let isPlay = !this.state.isPlaying;
        this.setState({
            isPlaying: isPlay,
            showVideoCover: false
        });
        if (this.state.playFromBeginning) {
            this.videoPlayer.seek(0);
            this.setState({
                playFromBeginning: false,
            })
        }
    }

    /// 点击了工具栏上的播放按钮
    onControlPlayPress() {
        this.onPressPlayButton();
    }

    /// 点击了工具栏上的全屏按钮
    onControlShrinkPress() {
        if (this.state.isFullScreen) {
            Orientation.lockToPortrait();
        } else {
            Orientation.lockToLandscape();
        }
    }

    /// 进度条值改变
    onSliderValueChanged(currentTime) {
        this.videoPlayer.seek(currentTime);
        if (this.state.isPlaying) {
            this.setState({
                currentTime: currentTime
            })
        } else {
            this.setState({
                currentTime: currentTime,
                isPlaying: true,
                showVideoCover: false
            })
        }
    }

    _onLayout = (event) => {
        //获取根View的宽高
        let {width, height} = event.nativeEvent.layout;
        // 一般设备横屏下都是宽大于高，这里可以用这个来判断横竖屏
        let isLandscape = (width > height);
        if (isLandscape){
            this.setState({
                videoWidth: width,
                videoHeight: height,
                isFullScreen: true,
            })
        } else {
            this.setState({
                videoWidth: width,
                videoHeight: width * 217/375,
                isFullScreen: false,
            })
        }
    };

    /// -------外部调用事件方法-------

    ///播放视频，提供给外部调用
    playVideo() {
        this.setState({
            isPlaying: true,
            showVideoCover: false
        })
    }

    /// 暂停播放，提供给外部调用
    pauseVideo() {
        this.setState({
            isPlaying: false,
        })
    }

    /// 切换视频并可以指定视频开始播放的时间，提供给外部调用
    switchVideo(videoURL, seekTime) {
        this.setState({
            videoUrl: videoURL,
            currentTime: seekTime,
            isPlaying: true,
            showVideoCover: false
        });
        this.videoPlayer.seek(seekTime);
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },

    playButton: {
        width: 50,
        height: 50,
    },
    playControl: {
        width: 24,
        height: 24,
        marginLeft: 15,
    },
    shrinkControl: {
        width: 15,
        height: 15,
        marginRight: 15,
    },
    time: {
        fontSize: 12,
        color: 'white',
        marginLeft: 10,
        marginRight: 10
    },
    control: {
        flexDirection: 'row',
        height: 44,
        alignItems:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'absolute',
        bottom: 0,
        left: 0
    },
});