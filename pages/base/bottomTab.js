import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    Image,
    Platform
} from 'react-native';
import {
    createBottomTabNavigator
} from 'react-navigation';
import color from '../../macro/color';
import Main from '../main/main';
import Discovery from '../discovery/discovery';
import Mine from '../mine/mine';
import Hot from '../hot/hot';
import Icon from 'react-native-vector-icons/Ionicons';


export default Tab = createBottomTabNavigator(

    {
        Main: {
            screen: Main,
            navigationOptions: {
                tabBarPosition: 'bottom',
                tabBarLabel: '首页',
                showLabel: true,
                tabBarIcon:({tintColor, focused}) => (
                    <Image style={{width:20,height:20}} source={focused ? require('../../image/tabbar/home_selected.png') : require('../../image/tabbar/home_normal.png')} />
                ),
            }
        },

        Discovery: {
            screen: Discovery,
            navigationOptions: {
                tabBarPosition: 'bottom',
                tabBarLabel: '发现',
                showLabel: true,
                tabBarIcon:({tintColor, focused}) => (
                    <Image style={styles.tabBarIcon} source={focused ? require('../../image/tabbar/find_selected.png') : require('../../image/tabbar/find_normal.png')} />
                ),
            }
        },

        Hot: {
            screen: Hot,
            navigationOptions: {
                tabBarPosition: 'bottom',
                tabBarLabel: '热门',
                showLabel: true,
                tabBarIcon:({tintColor, focused}) => (
                    <Image style={{width:20,height:20}} source={focused ? require('../../image/tabbar/hot_selected.png') : require('../../image/tabbar/hot_normal.png')} />
                ),
            }
        },

        Mine: {
            screen: Mine,
            navigationOptions: {
                tabBarPosition: 'bottom',
                tabBarLabel: '我的',
                showLabel: true,
                tabBarIcon:({tintColor, focused}) => (
                    <Image style={styles.tabBarIcon} source={focused ? require('../../image/tabbar/mine_selected.png') : require('../../image/tabbar/mine_normal.png')} />
                ),
            }
        },
    }, {
        animationEnabled: true,
        swipeEnabled: false,
        initialRouteName: 'Main',
        tabBarOptions: {
            activeTintColor: color.tabbar_active,
            inactiveTintColor: color.tabbar_inactive,
            indicatorStyle: {
                height: 0,
            },
            labelStyle: {
                fontSize: 11,
            },
            style: {
                borderTopColor: '#ebebeb',
                borderWidth: 0,
                backgroundColor: 'white',
                height: Dimensions.get('window').height*0.08,
            }
        }
    }
)

const styles = StyleSheet.create({

    tabBarIcon: {
        width: 23,
        height: 23,
    },
});