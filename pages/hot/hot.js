/**
 * Created by zjqian on 2018/8/21.
 */
import React, {
    Component
} from 'react';
import {
    View
} from 'react-native';
import ScrollTable, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import HotItemPage from './hotItem';
import px2dp from '../../utils/px2dp';
import NavBar from '../../common/NavBar';

export default class Hot extends Component {
    render() {
        return(
            <View style={{flex: 1}}>
                <NavBar title={'热门'}/>
                <ScrollTable
                    renderTabBar={() => <DefaultTabBar/>}
                    tabBarUnderlineStyle={{backgroundColor:'#343436',height: 2}}
                    tabBarBackgroundColor='#FFFFFF'
                    tabBarActiveTextColor='#343436'
                    tabBarInactiveTextColor='#939393'
                    tabBarTextStyle={{fontSize: px2dp(16)}}
                >

                    <HotItemPage navigation={this.props.navigation} rankType={'weekly'} tabLabel="周排行" />
                    <HotItemPage navigation={this.props.navigation} rankType={'monthly'} tabLabel="月排行" />
                    <HotItemPage navigation={this.props.navigation} rankType={'historical'} tabLabel="总排行" />
                </ScrollTable>
            </View>

        )
    }
}