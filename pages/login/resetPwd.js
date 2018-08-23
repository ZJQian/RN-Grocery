/**
 * Created by zjqian on 2018/8/15.
 */
import React, {
    Component
} from 'react';

import {
    TextInput,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import color from '../../macro/color';
import px2dp from '../../utils/px2dp';

export default class ResetPwd extends Component {

    static navigationOptions = ({navigation, navigationOptions}) => {
        return {
            headerTitle: '杂货铺',
            headerBackImage: (
                <View  style={{width: 60, height: 30, paddingLeft: 15, justifyContent: 'center'}}>
                    <Image source={require('../../image/nav/nav/nav_icon_back2.png')} />
                </View>
            )
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            accountText: '',
            passwordText: '',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{marginTop: px2dp(115), fontFamily: 'PingFangSC-Medium',color: color.color333,fontSize: 22}}>重置密码</Text>
                <TextInput style={{fontSize: 16, marginTop: px2dp(40), height: 40}}
                           placeholder={'请输入11位手机号'}
                           placeholderTextColor={'#A1A1A1'}
                           onChangeText={(text) => this.setState({accountText: text})}
                           value={this.state.accountText}
                           keyboardType={'number-pad'}
                           clearButtonMode={'while-editing'}/>
                <View style={{height: 0.5, backgroundColor: color.line}}/>
                <TextInput style={{fontSize: 16, marginTop: px2dp(20), height: 40}}
                           placeholder={'请输入6-16位密码'}
                           placeholderTextColor={'#A1A1A1'}
                           onChangeText={(text) => this.setState({passwordText: text})}
                           value={this.state.passwordText}
                           secureTextEntry={true}
                           clearButtonMode={'while-editing'}/>
                <View style={{height: 0.5, backgroundColor: color.line}}/>

                <TouchableOpacity activeOpacity={0.5} style={styles.btn_login} onPress={this.resetPress.bind(this)}>
                    <Text style={{color: color.white, fontSize: 14}}>重置</Text>
                </TouchableOpacity>
            </View>
        )
    };

    resetPress() {

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: px2dp(30),
    },
    btn_login: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#C44848',
        height: 42,
        marginTop: px2dp(60),
    }
})