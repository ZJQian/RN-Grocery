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
import alert from '../../utils/alertUtils';
import {
    sign,
    md5
} from '../../utils/signUtils';
import {validAccount} from '../../utils/stringUtils';
import NetRequest from '../../tool/NetRequest';
import Toast from 'react-native-easy-toast';

export default class Register extends Component {

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
                <Toast ref="toast" position={'center'}/>
                <Text style={{marginTop: px2dp(115), fontFamily: 'PingFangSC-Medium',color: color.color333,fontSize: 22}}>注册</Text>
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

                <TouchableOpacity activeOpacity={0.5} style={styles.btn_login} onPress={this.registerPress.bind(this)}>
                    <Text style={{color: color.white, fontSize: 14}}>注册</Text>
                </TouchableOpacity>
            </View>
        )
    };

    registerPress() {

        if (!this.checkInput()){
            return
        }

        let app_key = '0D45B5FDF75D12C8EF6628D4884FF3AA'
        let account = this.state.accountText
        let pwd = this.state.passwordText
        let params = {s: 'App.User.Register',username: account,password: md5(pwd),app_key: app_key}
        let sign1 = sign(params)
        params['sign'] = sign1
        NetRequest.get('http://hn2.api.okayapi.com',params,null).then((response) => {

            if (response['ret'] == 200) {

                if (response['data']['err_code'] != 0) {
                    alert(response['data']['err_msg'])
                }else {
                    this.refs.toast.show('注册成功');
                    setTimeout(() => {
                        this.props.navigation.goBack();
                    },1000)
                }
            } else {
                this.refs.toast.show(response['msg']);
            }
        }, (error) => {
           alert('error')
        })
    };

    checkInput() {
        if (this.state.accountText.length==0) {
            this.refs.toast.show('账号不能为空!');
            return false
        }

        if (!validAccount(this.state.accountText)) {
            this.refs.toast.show('请输入有效的手机号码');
            return false
        }
        if (this.state.passwordText.length==0) {
            this.refs.toast.show('密码不能为空!');
            return false
        }

        return true
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