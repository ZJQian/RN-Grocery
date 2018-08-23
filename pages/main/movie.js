/**
 * Created by zjqian on 2018/8/16.
 */

import React, {
    Component
} from 'react';

import {
    TouchableOpacity,
    Image,
    View,
    Text,
    Alert
} from 'react-native';
import ScrollTable, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import OrderPage from '../mine/order';
import CollectPage from '../mine/collect';
import px2dp from '../../utils/px2dp';
import color from '../../macro/color';

export default class Movie extends Component {

    constructor(props) {
        super(props);
    };
    static navigationOptions = {
        headerTitle: '电影',
        headerBackImage: (
            <View  style={{width: 60, height: 30, paddingLeft: 15, justifyContent: 'center'}}>
                <Image source={require('../../image/nav/nav/nav_icon_back2.png')} />
            </View>
        )
    };


    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollTable
                    renderTabBar={() => <DefaultTabBar/>}
                    tabBarUnderlineStyle={{backgroundColor:'#FF6E6E'}}
                    tabBarBackgroundColor='#FFFFFF'
                    tabBarActiveTextColor='#FF6E6E'
                    tabBarInactiveTextColor='#373737'
                    tabBarTextStyle={{fontSize: px2dp(18)}}
                >

                    <OrderPage navigation={this.props.navigation} showType={'showing'} tabLabel="正在热映" />
                    <OrderPage navigation={this.props.navigation} showType={'willShow'} tabLabel="即将上映" />
                    <CollectPage navigation={this.props.navigation} tabLabel="Top250" />
                </ScrollTable>
            </View>
        )
    }
}
