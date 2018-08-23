import React, {
    Component
} from 'react';
import {
    Button,
    Image,
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Alert,
    FlatList
} from 'react-native';
import Swiper from 'react-native-swiper';
import color from '../../macro/color';
import NavBar from '../../common/NavBar';
import px2dp from '../../utils/px2dp';
import NetRequest from '../../tool/NetRequest';
import CommonWeb from '../../common/commonWeb';

const {width, height} = Dimensions.get('window')

export default class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bannerData: null,
            recommendData: [],
        }
    };

    static navigationOptions = {
        headerTitle: '首页',
    };

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (

            <View style={styles.container}>
                <NavBar title={'首页'}/>
                <ScrollView style={styles.container}>

                    <View style={styles.cycle_view}>
                        {
                            this.state.bannerData == null ?
                                <View style={styles.slide}/>
                                :
                                <Swiper
                                    style={styles.swiper}
                                    height={width/375*200}
                                    loop={true}
                                    autoplay={true}
                                    autoplayTimeout={3}
                                    horizontal={true}
                                    paginationStyle={{bottom: 20}}
                                    showsPagination={true}>
                                    {this.renderSwiper()}
                                </Swiper>
                        }
                    </View>

                    <View style={styles.top_view}>
                        <View style={styles.category_view}>
                            <View style={styles.categorybox}>
                                <Image style={{width:50,height:50}} source={require('../../image/main/music/home_icon_bill.png')}/>
                                <Text style={styles.categorytext}>音乐</Text>
                            </View>

                            <TouchableOpacity activeOpacity={0.5} onPress={this.moviePress.bind(this)}>
                                <View style={styles.categorybox}>
                                    <Image style={{width:50,height:50}} source={require('../../image/main/music/home_icon_type.png')}/>
                                    <Text style={styles.categorytext}>电影</Text>
                                </View>
                            </TouchableOpacity>

                            <View style={styles.categorybox}>
                                <Image style={{width:50,height:50}} source={require('../../image/main/music/home_icon_rankings.png')}/>
                                <Text style={styles.categorytext}>排行榜</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.hot_view}>
                        <View style={styles.top_news_view}>
                            <Text style={{fontWeight: 'bold',fontSize: px2dp(18), color: color.color333}}>推荐歌单</Text>
                            <TouchableOpacity activeOpacity={0.5} style={{flexDirection: 'row'}} onPress={() => this.props.navigation.navigate('AllRecommend')}>
                                <Text style={{color: color.color999}}>查看全部</Text>
                                <Image source={require('../../image/main/icon/icon_more.png')} style={{marginLeft: 5}}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.line_view}/>
                        <FlatList
                            data={this.state.recommendData}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{marginTop: 10}}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    };

    fetchData() {
        NetRequest.get('http://www.wanandroid.com/banner/json',null,null).then((response) => {

            this.setState({
                bannerData: response['data']
            })
        }, (error) => {
            alert('error')
        })

        NetRequest.get('https://api.douban.com/v2/music/search?q=李志&count=5', null, null).then((response) => {
            this.setState({
                recommendData: response['musics']
            })
        }, (error) => {

        })
    };

    // 渲染
    renderSwiper() {
        var itemArr = [];
        for (var i = 0; i < this.state.bannerData.length; i++) {
            let data = this.state.bannerData[i];
            itemArr.push(
                <TouchableOpacity activeOpacity={0.8} key={i} onPress={this.bannerPress.bind(this,data)}>
                    <Image source={{uri: data['imagePath']}} style={styles.swiper_image} />
                </TouchableOpacity>
            );
        }
        return itemArr;
    };

    renderItem({item, index}) {
        return (
            <TouchableOpacity activeOpacity={0.5}>
                <View style={{marginRight: 10, alignItems: 'center', paddingBottom: 15}}>
                    <Image source={{uri: item['image']}} style={{width: 120,height:120}}/>
                    <Text style={{marginTop: 5, width: 120, textAlign: 'center'}} numberOfLines={1}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    moviePress() {
        this.props.navigation.navigate('Movie')
    };
    bannerPress(bannerItem) {
        // alert(bannerItem['url'])
        this.props.navigation.navigate('CommonWeb', {title: bannerItem['title'],urlString: bannerItem['url']})
    }
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: color.view_background,
        flex: 1,
    },

    cycle_view: {
      height: width/375*200,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    swiper: {
    },
    swiper_image: {
        height: width/375*200,
    },
    top_view: {
        backgroundColor: color.white,
        marginHorizontal: 12,
        marginTop: -12,
        borderRadius: 5,
    },
    top_news_view: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.white,
        borderRadius: 5,
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    hot_view: {
        backgroundColor: color.white,
        margin: 12,
        borderRadius: 5,
        paddingLeft: 10
    },
    line_view: {
        height: 0.8,
        backgroundColor: color.line,
    },
    category_view: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 20,
    },
    categorybox: {
        flex: 1,
        backgroundColor: color.white,
        alignItems: "center"
    },
    categorytext: {
        alignSelf: 'center',
        fontSize: 16,
        color: color.color666,
        marginTop: 20,
    },

});