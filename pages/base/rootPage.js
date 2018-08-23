import React, {
    Component
} from 'react';
import {
    AsyncStorage
} from 'react-native';
import {
    createStackNavigator
} from 'react-navigation';
import Tab from './bottomTab';
import SettingPage from '../mine/settings';
import AppointmentPage from '../mine/appointment';
import CollectPage from '../mine/collect';
import OrderPage from '../mine/order';
import PointPage from '../mine/point';
import PromotionPage from '../mine/promotion';
import MainPage from '../main/main';
import MovieDetail from '../mine/movieDetail';
import Loginpage from '../login/login';
import RegisterPage from '../login/register';
import ResetPage from '../login/resetPwd';
import Movie from '../main/movie';
import px2dp from '../../utils/px2dp';
import color from '../../macro/color';
import AllRecommend from '../main/allRecommend';
import CommonWeb from '../../common/commonWeb';
import VideoPlay from '../hot/videoPlay';


const HomeStack = createStackNavigator(
    {
        Tab: {
            screen: Tab,
            navigationOptions: {
                header: null,
            }
        },
        Main: {screen: MainPage},
        SettingPage: {screen: SettingPage},
        AppointmentPage: {screen: AppointmentPage},
        CollectPage: {screen: CollectPage},
        OrderPage: {screen: OrderPage},
        PointPage: {screen: PointPage},
        PromotionPage: {screen: PromotionPage},
        MovieDetail: {screen: MovieDetail},
        Login: {screen: Loginpage},
        Register: {screen: RegisterPage},
        Reset: {screen: ResetPage},
        Movie: {screen: Movie},
        AllRecommend: {screen: AllRecommend},
        CommonWeb: {screen: CommonWeb},
        VideoPlay: {screen:VideoPlay},
    },{

        initialRouteName: 'Login',
        headerMode: 'float',
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
            },
            headerTitleStyle: {
                fontSize: px2dp(18),
                color: color.color333,
                fontWeight: 'normal',
            },
            headerBackTitle: null,
        }
    }
)


export default class root extends Component {

    constructor(props) {
        super(props);

        /**
        //需要查询的键值
        var keys = ["account","password"];
        var isLogin = false;
        //根据键数组查询保存的键值对
        AsyncStorage.multiGet(keys, function(errs, result){
            //如果发生错误，这里直接返回（return）防止进入下面的逻辑
            if(errs){
                return;
            }
            isLogin = result[0][1] != null ? true : false
        });

        this.state = {
            isLogin: isLogin
        }
         **/
    }

    render() {
        return (
            <HomeStack />
        )
    }
}