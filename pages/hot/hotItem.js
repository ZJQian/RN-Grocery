/**
 * Created by zjqian on 2018/8/22.
 */
import React, {
    Component
} from 'react';

import {
    Text,
    FlatList,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    View
} from 'react-native';
import NetRequest from '../../tool/NetRequest';
import px2dp from '../../utils/px2dp';
import duration2mmss from '../../utils/timeUtils';

const {width, height} = Dimensions.get('window')
const PropTypes = require('prop-types');

export default class HotItem extends Component {

    constructor(props) {
        super(props);
        this.state={
            rankData: [],
        }
    };

    static propTypes = {
        navigation: PropTypes.object,
        rankType: PropTypes.string,
    }

    componentDidMount() {
        this.fetchData(this.props.rankType);
    }

    render() {
        return(
            <FlatList
                data={this.state.rankData}
                renderItem={this._renderItem.bind(this)}
                keyExtractor={(item, index) => index}
            />
        )
    };

    _renderItem({item, index}) {
        return (
            <TouchableOpacity activeOpacity={0.8} style={styles.item} onPress={this._itemOnPress.bind(this,item,index)}>
                <Image style={styles.img} source={{uri: item['data']['cover']['feed']}}/>
                <View style={[styles.img, {opacity: 0.4, backgroundColor: 'black'}]}/>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.text} numberOfLines={1}>{item['data']['title']}</Text>
                    <Text style={styles.sub_text} numberOfLines={1}>{item['data']['category']} / {duration2mmss(item['data']['duration'])}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    fetchData(rankType) {

        var params = {}
        params["num"] = 10
        params["strategy"] = rankType
        params["udid"] = '26868b32e808498db32fd51fb422d00175e179df'
        params["vc"] = 83
        NetRequest.get("http://baobab.wandoujia.com/api/v3/ranklist",params,null).then((response) => {

            this.setState({
                rankData: response['itemList'],
            });
        },(error) => {
            alert('error')
        })
    };

    _itemOnPress(item, index) {
        this.props.navigation.navigate('VideoPlay',{item:item})
    }
}
const styles = StyleSheet.create({

    item: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: width*217/375,
    },

    img: {
        width: width,
        height: width*217/375,
        position:'absolute',
    },

    text: {
        color: 'white',
        fontSize: px2dp(18),
        backgroundColor: 'transparent',
        marginHorizontal: 10
    },
    sub_text: {
        color: 'white',
        fontSize: px2dp(13),
        backgroundColor: 'transparent',
        marginHorizontal: 10
    }
})