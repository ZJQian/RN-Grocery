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
} from 'react-native';
import color from '../../macro/color';
import NavBar from "../../common/NavBar";
import NetRequest from '../../tool/NetRequest';

const {width, height} = Dimensions.get('window')
const cols = 2;
const cellWH = (width-5)/cols;
const hMargin = 5;

export default class DiscoveryPage extends Component {
    static navigationOptions = {
        headerTitle:' 发现',
    };
    constructor(props) {
        super(props);
        this.state = {
            categoryData: [],
        }
        this.fetchData = this.fetchData.bind(this);
    };

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar title={'发现'}/>
                <FlatList
                    contentContainerStyle={styles.list_container}
                    data={this.state.categoryData}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        );
    };

    renderItem({item, index}) {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={this._onPressItem.bind(this,item,index)}>
                <View style={styles.item}>
                    <Image style={{position: 'absolute',width: cellWH,height:cellWH}} source={{uri: item['bgPicture']}}/>
                    <View style={{position: 'absolute',width: cellWH,height:cellWH,backgroundColor: '#000000',opacity: 0.3}}/>
                    <Text style={styles.item_text}>{item['name']}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    _keyExtractor = (item, index) => index;

    _onPressItem (item, index) {
    };
    fetchData() {
        var _this = this;
        NetRequest.get('http://baobab.wandoujia.com/api/v2/categories?udid=26868b32e808498db32fd51fb422d00175e179df&vc=83',null,null).then((response) => {
            _this.setState({
                categoryData: response,
            })
        }, (error) => {
           alert('error')
        });
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    list_container: {
        // 主轴方向
        flexDirection:'row',
        justifyContent: 'space-between',
        // 一行显示不下,换一行
        flexWrap:'wrap',
        // 侧轴方向
        alignItems:'center', // 必须设置,否则换行不起作用
    },
    item: {
        backgroundColor: color.white,
        width:cellWH,
        height:cellWH,
        marginTop:hMargin,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item_text: {
        fontSize: 16,
        color: color.white,
        backgroundColor: 'transparent',
    },
});