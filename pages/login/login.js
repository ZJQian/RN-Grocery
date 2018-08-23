/**
 * Created by zjqian on 2018/8/14.
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
    AsyncStorage
} from 'react-native';
import color from '../../macro/color';
import px2dp from '../../utils/px2dp';
import {
    sign,
    md5,
} from '../../utils/signUtils';
import {validAccount} from '../../utils/stringUtils';
import Tab from '../base/bottomTab';
import Register from './register';
import Reset from './resetPwd';
import NetRequest from '../../tool/NetRequest';
import Toast from 'react-native-easy-toast';

const PropTypes = require('prop-types');

export default class Login extends Component {

    static navigationOptions = {
        headerTitle: "杂货铺",
        headerStyle: {
            backgroundColor: 'white',
        },
        headerTitleStyle: {
            fontSize: px2dp(18),
            color: color.color333,
        },
    };

    constructor(props) {
        super(props);

        this.state = {
            accountText: '',
            passwordText: '',
        }

    };

    componentDidMount() {
        //需要查询的键值
        var keys = ["account","password"];
        var _that = this;
        //根据键数组查询保存的键值对
        AsyncStorage.multiGet(keys, function(errs, result){
            //如果发生错误，这里直接返回（return）防止进入下面的逻辑
            if(errs){
                return;
            }
            _that.setState({
                accountText: result[0][1] != null ? result[0][1] : '',
                passwordText: result[1][1] != null ? result[1][1] : '',
            })
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Toast ref="toast" position={'center'}/>
                <Text style={{marginTop: px2dp(115), fontFamily: 'PingFangSC-Medium',color: color.color333,fontSize: 22}}>登录</Text>
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
                <TouchableOpacity activeOpacity={0.5} style={{justifyContent: 'flex-end', flexDirection: 'row',marginTop: 10}} onPress={this.resetPress.bind(this)}>
                    <Text style={{color: color.color333, fontSize: 14}}>忘记密码?</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} style={styles.btn_login} onPress={this.loginPress.bind(this)}>
                    <Text style={{color: color.white, fontSize: 14}}>登录</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} style={{marginTop: px2dp(40), alignItems: 'center'}} onPress={this.registerPress.bind(this)}>
                    <Text style={{color: color.color999}}>去注册</Text>
                </TouchableOpacity>
            </View>

        )
    };

    loginPress() {

        if (!this.checkInput()){
            return
        }
        let app_key = '0D45B5FDF75D12C8EF6628D4884FF3AA'
        let account = this.state.accountText
        let pwd = this.state.passwordText
        let params = {s: 'App.User.Login',username: account,password: md5(pwd),app_key: app_key}
        let sign1 = sign(params)
        params['sign'] = sign1
        NetRequest.get('http://hn2.api.okayapi.com',params,null).then((response) => {

            if (response['ret'] == 200) {

                if (response['data']['err_code'] != 0) {
                    alert(response['data']['err_msg'])
                }else {

                    var _that = this;
                    var keyValuePairs = [['account', this.state.accountText], ['password', this.state.passwordText]]
                    AsyncStorage.multiSet(keyValuePairs, function(errs){
                        if(errs){
                            //TODO：存储出错
                            alert('数据保存出错')
                            return;
                        }
                        //登录成功  跳转主页
                        _that.props.navigation.replace('Tab');
                    });


                }
            } else {
                this.refs.toast.show(response['msg']);
            }
        }, (error) => {
            this.refs.toast.show('登录失败, 请稍后再试!');
        })

    };
    registerPress() {
        this.props.navigation.navigate('Register')
    };
    resetPress() {
        this.props.navigation.navigate('Reset')
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