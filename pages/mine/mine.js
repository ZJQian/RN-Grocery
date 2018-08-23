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
    FlatList,
    TouchableOpacity,
    CameraRoll,
    Alert
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import color from '../../macro/color';
import SettingPage from './settings';
import AppointmentPage from './appointment';
import CollectPage from './collect';
import OrderPage from './order';
import PointPage from './point';
import PromotionPage from './promotion';
import NavBar from "../../common/NavBar";
import px2dp from '../../utils/px2dp';


//图片选择器参数设置
const options = {
    title: '请选择图片来源',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'相册图片',
    customButtons: [
        {name: '自定义按钮', title: '自定义按钮'},
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

// type Props = {};
export default class MinePage extends Component {
    static navigationOptions = {
        headerTitle:'我的',
    };

    constructor(props) {
        super(props);
        this.state = {
            avatarSource: require('../../image/mine/head.png'),
        }
    };

    render() {
        return (
            <View style={styles.container_mine}>
                <NavBar title={'我的'}/>
                <FlatList
                    data={[
                        {title_name: '通知'},
                        {title_name: '会员中心'},
                        {title_name: '设置'},
                        {title_name: '定时关闭'},
                        {title_name: '获取帮助'},
                        {title_name: '反馈'}
                    ]}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    ListHeaderComponent={this._renderHeader.bind(this)}
                />
            </View>
        );
    };
    _renderItem = ({item, index}) => (
        <TouchableOpacity activeOpacity={0.5} onPress={this._onPress.bind(this,item,index)}>
            <View style={styles.item}>
                <View style={{flex: 1,  alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={styles.item_text}>{item.title_name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
    _renderHeader() {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={this._headPress.bind(this)}>
                <View style={styles.header_view}>
                    <View>
                        <Text style={{fontSize: px2dp(30), color: '#373737'}}>梵高先生</Text>
                        <Text style={{fontSize: px2dp(15), color: '#6D6D6D', marginTop: 10}}>查看并编辑个人资料</Text>
                    </View>
                    <View>
                        <Image source={this.state.avatarSource} style={{width: px2dp(70), height: px2dp(70), borderRadius: px2dp(35)}}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    _keyExtractor = (item, index) => index;
    _onPress(item, index) {
    };
    _headPress() {

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('用户取消了选择！');
            }
            else if (response.error) {
                alert("ImagePicker发生错误：" + response.error);
            }
            else if (response.customButton) {
                alert("自定义按钮点击：" + response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    avatarSource: source
                });
            }
        });
    }

}

const styles = StyleSheet.create({

    container_mine: {
        flex: 1,
        backgroundColor: color.white,
    },
    header_view: {
        width: Dimensions.get('window').width,
        height: px2dp(140),
        backgroundColor: color.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    item: {
        height: px2dp(60),
        backgroundColor: color.white,
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    item_separator: {
        height: 0.5,
        backgroundColor: color.line,
    },
    item_image: {
        width: 18,
        height: 18,
        marginLeft: 12,
        resizeMode: 'contain'
    },
    item_text: {
        marginLeft: 10,
        fontSize: px2dp(17),
        color: '#373737',
    },
    item_next: {
        width: 10,
        height: 13.75,
    }
});