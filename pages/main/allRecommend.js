/**
 * Created by zjqian on 2018/8/16.
 */

import React, { Component } from 'react';
import {
    Text,
    FlatList,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput
} from 'react-native';
import color from '../../macro/color';
import NetRequest from '../../tool/NetRequest';
import px2dp from '../../utils/px2dp';

const {width, height} = Dimensions.get('window')
const cols = 2;
const vMargin = 20;
const cellWH = (width-2*vMargin-15)/cols;
const hMargin = 25;

export default class AllRecommend extends Component {


    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    };

    static navigationOptions = {
        headerTitle: (
            <View style={{paddingHorizontal: 10, borderRadius: px2dp(15), borderColor: color.line, borderWidth: 0.8}}>
                <TextInput placeholder={'请尝试"李志"'} style={{width: width-140, height: px2dp(30)}} returnKeyType={'search'}/>
            </View>
        ),
        headerBackImage: (
            <View  style={{width: 60, height: 30, paddingLeft: 15, justifyContent: 'center'}}>
                <Image source={require('../../image/nav/nav/nav_icon_back2.png')} />
            </View>
        ),
    };

    componentDidMount() {
        this.fetchData('李志');
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={styles.list_container}
                />
            </View>
        )
    };

    renderItem({item, index})  {

        return (
            <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.item}>
                    <Image source={{uri: item['image']}} style={{width: cellWH,height:cellWH, borderRadius: 5}}/>
                    <Text style={{marginTop: 5, textAlign: 'center'}} numberOfLines={1}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    fetchData(key) {
        NetRequest.get('https://api.douban.com/v2/music/search?q='+key,null,null).then((response) => {
            this.setState({
                data: response['musics']
            })
        }, (error) => {

        })
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        paddingBottom: 15,
    },
    list_container: {
        // 主轴方向
        flexDirection:'row',
        justifyContent: 'space-between',
        // 一行显示不下,换一行
        flexWrap:'wrap',
        // 侧轴方向
        alignItems:'center', // 必须设置,否则换行不起作用
        paddingHorizontal: 20,
    },
    item: {
        width:cellWH,
        marginTop:hMargin,
        alignItems: 'center',
    }
})