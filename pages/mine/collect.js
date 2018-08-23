/**
 * Created by zjqian on 2018/8/10.
 */

import React, {
    Component
} from 'react';
import {
    FlatList,
    Text,
    Alert,
    View,
    StyleSheet,
    Image,
    Dimensions,
    RefreshControl,
    TouchableOpacity
} from 'react-native';
import color from '../../macro/color';
import px2dp from '../../utils/px2dp';
import NetRequest from '../../tool/NetRequest';
import MovieDetail from './movieDetail';
import StarRating from 'react-native-star-rating';

const {width, height} = Dimensions.get('window')
const PropTypes = require('prop-types');

export default class CollectPage extends Component {

    static navigationOptions = {
        headerTitle: "Top250",
        headerStyle: {
            backgroundColor: color.white,
        },
        headerTitleStyle: {
            fontSize: px2dp(18),
            color: color.color333,
            fontWeight: 'normal',
        },
    };

    static propTypes = {
        navigation: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            refreshing: false,
        };
        // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向不对
        // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
        this.fetchData = this.fetchData.bind(this);
    };

    componentDidMount() {
        this.fetchData();
    };

    fetchData() {
        NetRequest.get("https://api.douban.com/v2/movie/top250",null,null).then((response) => {
            this.setState({
                data: this.state.data.concat(response['subjects']),
                loaded: true,
                refreshing: false
            });
        },(error) => {
            Alert.alert('error')
        })
    };

    render() {

        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <FlatList
                style={styles.list}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
                data={this.state.data}
                renderItem={this._renderItem.bind(this)}
                keyExtractor={this._keyExtractor}
                ItemSeparatorComponent={this._separator}
            />
        )
    };

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>Loading movies...</Text>
            </View>
        );
    }

    _renderItem({item, index}) {
        // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
        // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={this._onPress.bind(this,item)}>
                <View style={styles.item_container}>
                    <Image
                        source={{ uri: item.images.small }}
                        style={styles.thumbnail}
                    />
                    <View style={styles.rightContainer}>
                        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                        <View style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
                            <StarRating
                                containerStyle={{width: 110}}
                                disabled={false}
                                emptyStar={'ios-star-outline'}
                                fullStar={'ios-star'}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                maxStars={5}
                                rating={item['rating']['average']/2}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                fullStarColor={'orange'}
                                starSize={20}
                            />
                            <Text style={{color: color.color999, fontSize: px2dp(14), marginLeft: 10}}>{item['rating']['average']}</Text>
                        </View>
                        <Text style={styles.director}>导演: {this.array2Str(item['directors'], "name")}</Text>
                        <Text style={styles.cast}>主演: {this.array2Str(item['casts'], "name")}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        );
    };
    _keyExtractor = (item, index) => index;
    _separator = () => {
        return <View style={styles.item_separator}/>
    };
    _onRefresh = () => {
        this.setState({refreshing: true});
        this.fetchData();
    };
    _onPress = (item) => {
        this.props.navigation.navigate('MovieDetail', {item: item})
    };
    onStarRatingPress(rating) {};

    array2Str(array, key) {
        var strArray = [];
        for (var i=0;i<array.length;i++) {
            let item = array[i];
            strArray.push(item[key])
        }
        return strArray.join('/')
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.view_background,
    },
    rightContainer: {
        marginLeft: 10,
        height: px2dp(100*377.0/270.0),
        width: width-px2dp(120)-12-10
    },
    item_container: {
        paddingLeft: 12,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.white,
    },
    item_separator: {
        height: 0.8,
        backgroundColor: color.line,
    },
    title: {
        fontSize: px2dp(18),
    },
    director: {
        marginTop: px2dp(12),
        color: color.color999
    },
    cast: {
        marginTop: px2dp(8),
        color: color.color999
    },
    thumbnail: {
        padding: 10,
        width: px2dp(100),
        height: px2dp(100*377.0/270.0)
    },
    list: {
        backgroundColor: "#F5FCFF"
    }
});