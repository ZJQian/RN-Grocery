/**
 * Created by zjqian on 2018/8/11.
 */
import React, {
    Component,
} from 'react';
import {
    Text,
    Alert,
    ScrollView,
    View,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    LayoutAnimation,
    Modal,
    TouchableHighlight
} from 'react-native';
import NetRequest from '../../tool/NetRequest';
import color from '../../macro/color';
import px2dp from '../../utils/px2dp';
import StarRating from 'react-native-star-rating';
import LoginPage from '../login/login';


const {width, height} = Dimensions.get('window')

export default class MovieDetail extends Component {

    static navigationOptions = ({navigation,navigationOptions }) => {
        let item = navigation.getParam('item','电影详情')
        return {
            title: item.title,
            headerBackImage: (
                <View  style={{width: 60, height: 30, paddingLeft: 15, justifyContent: 'center'}}>
                    <Image source={require('../../image/nav/nav/nav_icon_back2.png')} />
                </View>
            )
        }
    };

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        const item = navigation.getParam('item', 'item');
        this.state = {
            item: item,
            loaded: false,
            detailItem: {},
            castsData: [],
            numberOfLines: 4,
            showMoreBtn: true,
            modalVisible: false,
        }
        this.fetchData = this.fetchData.bind(this);
    };


    componentDidMount() {
        this.fetchData();
    };

    setModalVisible(visible) {
        // this.setState({ modalVisible: visible });
    }

    render() {

        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (

            <ScrollView style={styles.container}>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.");
                    }}
                >
                    {/*<View style={{ marginTop: 22 }}>*/}
                        {/*<View>*/}
                            {/*<Text>Hello World!</Text>*/}

                            {/*<TouchableHighlight*/}
                                {/*onPress={() => {*/}
                                    {/*this.setModalVisible(!this.state.modalVisible);*/}
                                {/*}}*/}
                            {/*>*/}
                                {/*<Text>Hide Modal</Text>*/}
                            {/*</TouchableHighlight>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                </Modal>

                <View style={styles.img_container}>
                    <Image style={styles.img} source={{uri: this.state.detailItem.images.small}}/>
                </View>
                <View style={styles.intro_container}>
                    <View style={styles.intro}>
                        <Text style={{fontSize: px2dp(16)}}>{this.state.detailItem['title']}</Text>
                        <Text style={{fontSize: px2dp(12), fontWeight: 'bold', color: color.color999, marginTop: px2dp(15)}}>{this.state.detailItem['year']} / {this.state.detailItem['countries'][0]} / {this.state.detailItem['genres'][0]}</Text>
                    </View>
                    <View style={styles.avarage_view}>
                        <Text style={{color: color.color999, fontSize: px2dp(12)}}>豆瓣评分</Text>
                        <Text style={{fontSize: px2dp(20), fontWeight: 'bold', marginTop: 5}}>{this.state.detailItem['rating']['average']}</Text>
                        <StarRating
                            containerStyle={{width: 70}}
                            disabled={false}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            maxStars={5}
                            rating={this.state.detailItem['rating']['average']/2}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                            fullStarColor={'orange'}
                            starSize={12}
                        />
                        <Text style={{color: color.color999, fontSize: px2dp(12), marginTop: 10}}>{String(this.state.detailItem['ratings_count'])}人</Text>
                    </View>
                </View>
                <View style={styles.watch_container}>
                    <TouchableOpacity activeOpacity={0.5} style={styles.wanted_watch} onPress={() => {
                        this.setModalVisible(true);
                    }}>
                        <Text style={{color: 'orange'}}>想看</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={styles.watched}>
                        <Text style={{color: 'orange'}}>看过</Text>
                        <StarRating
                            containerStyle={{width: 70, marginLeft: 10}}
                            disabled={false}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            maxStars={5}
                            rating={10}
                            // selectedStar={(rating) => this.onStarRatingPress(rating)}
                            fullStarColor={'orange'}
                            starSize={12}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.detail_container}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{color: color.color999, fontSize: px2dp(12)}}>剧情简介</Text>
                        {
                            this.state.showMoreBtn == false ?
                                null
                                :
                                <TouchableOpacity activeOpacity={0.5} onPress={this.toggleMorePress.bind(this)}>
                                    <Text style={{color: '#2cc1ff', fontSize: px2dp(12)}}>展开</Text>
                                </TouchableOpacity>
                        }
                    </View>
                    <Text style={{fontSize: px2dp(13),color: color.color333, marginTop: 10, lineHeight: 20}} numberOfLines={this.state.numberOfLines}>{this.state.detailItem['summary']}</Text>
                </View>
                <View style={styles.detail_container}>
                    <Text style={{color: color.color999, fontSize: px2dp(12)}}>影人</Text>
                    <FlatList
                        style={{marginTop: 10}}
                        data={this.state.castsData}
                        keyExtractor={(item, index) => index}
                        renderItem={this._renderItem.bind(this)}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </ScrollView>

        )
    };

    renderLoadingView() {
        return (
            <View style={styles.loading_container}>
                <Text>Loading movie details...</Text>
            </View>
        );
    };

    _renderItem({item, index}) {
        return (
            <TouchableOpacity activeOpacity={0.5}>
                <View style={{marginRight: 10, alignItems: 'center', paddingBottom: 15}}>
                    <Image source={{uri: item['avatars']['small']}} style={{width: 80,height:80*284/200.0}}/>
                    <Text style={{marginTop: 5, width: 80, textAlign: 'center'}} numberOfLines={1}>{item.name}</Text>
                    <Text style={{color: color.color999, fontSize: px2dp(12), marginTop: 3}}>{index == 0 ? '导演' : '主演'}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    onStarRatingPress(rating){};

    toggleMorePress() {

        LayoutAnimation.spring();
        this.setState({
            numberOfLines: null,
            showMoreBtn: false,
        })
    };

    fetchData() {
        NetRequest.get('https://api.douban.com/v2/movie/subject/'+this.state.item.id, null, null).then((response) => {

            var casts = []
            casts = response['casts']
            casts.unshift(response['directors'][0])

            this.setState({
                loaded: true,
                detailItem: response,
                castsData: casts,
            })
        }, (error) => {
            Alert.alert("error")
        })
    };
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: color.view_background,
    },
    loading_container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.view_background,
    },
    img_container: {
        alignItems: 'center',
        paddingHorizontal: 100,
        paddingVertical: 30,
    },
    img: {
        height: (width-200)*399.0/270.0,
        width: width-200,
    },
    intro_container: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    intro: {
        flex: 2,
    },
    avarage_view: {
        flex: 1,
        backgroundColor: color.white,
        marginLeft: 20,
        height: (width-60)/3.0,
        alignItems: 'center',
        paddingVertical: 10,
        shadowColor: '#000000',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.5,
    },
    watch_container: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    wanted_watch: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: 'orange',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    watched: {
        flex: 2,
        height: 40,
        borderWidth: 1,
        borderColor: 'orange',
        borderRadius: 3,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    detail_container: {
        paddingHorizontal: 20,
        marginTop: 20,
    },

})