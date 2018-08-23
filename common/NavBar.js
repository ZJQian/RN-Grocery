/**
 * Created by zjqian on 2018/8/10.
 */
import React, {
    Component,
} from 'react'
import {
    StyleSheet,
    View,
    Animated,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    Image,
    Dimensions
} from 'react-native'
import px2dp from '../utils/px2dp'
import Icon from 'react-native-vector-icons/Ionicons'
import color from '../macro/color';

const {width, height} = Dimensions.get('window');

const PropTypes = require('prop-types');
export default class NavBar extends Component {
    static propTypes = {
        title: PropTypes.string,
        leftIcon: PropTypes.number,
        rightIcon: PropTypes.string,
        leftPress: PropTypes.func,
        rightPress: PropTypes.func,
        style: PropTypes.object
    }
    static topbarHeight = (Platform.OS === 'ios' ? 64 : 42)

    renderBtn(pos) {
        let render = (obj) => {
            const {name, onPress} = obj;
            if (Platform.OS === 'android') {
                return (
                    <TouchableNativeFeedback onPress={onPress} style={styles.btn}>
                        {/*<Icon name={name} size={px2dp(26)} color="#000000"/>*/}
                        <View  style={{width: 60, height: 30, paddingLeft: 15, justifyContent: 'center'}}>
                            <Image source={name} />
                        </View>
                    </TouchableNativeFeedback>
                )
            } else {
                return (
                    <TouchableOpacity onPress={onPress} style={styles.btn}>
                        {/*<Icon name={name} size={px2dp(26)} color="#000000"/>*/}

                        <View  style={{width: 60, height: 30, paddingLeft: 15, justifyContent: 'center'}}>
                            <Image source={name} />
                        </View>
                    </TouchableOpacity>
                )
            }
        }
        if (pos == "left") {
            if (this.props.leftIcon) {
                return render({
                    name: this.props.leftIcon,
                    onPress: this.props.leftPress
                })
            } else {
                return (<View style={styles.btn}></View>)
            }
        } else if (pos == "right") {
            if (this.props.rightIcon) {
                return render({
                    name: this.props.rightIcon,
                    onPress: this.props.rightPress
                })
            } else {
                return (<View style={styles.btn}></View>)
            }
        }
    }

    render() {
        return (
            <View style={[styles.topbar, this.props.style]}>
                {this.renderBtn("left")}
                <Animated.Text numberOfLines={1}
                               style={[styles.title, this.props.titleStyle]}>{this.props.title}</Animated.Text>
                {this.renderBtn("right")}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topbar: {
        height: NavBar.topbarHeight,
        backgroundColor: "#ffffff",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        paddingHorizontal: px2dp(10)
    },
    btn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: color.color333,
        fontSize: px2dp(18),
        marginLeft: px2dp(5),
        width: width-130,
        textAlign: 'center',
    }
});
