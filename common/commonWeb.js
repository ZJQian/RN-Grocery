/**
 * Created by zjqian on 2018/8/20.
 */
import React, {
    Component
} from 'react';
import {
    WebView,
    StyleSheet,
    View,
    Image
} from 'react-native';

export default class CommonWeb extends Component {

    static navigationOptions = ({navigation,navigationOptions }) => {
        let title = navigation.getParam('title','')
        return {
            title: title,
            headerBackImage: (
                <View  style={{width: 60, height: 30, paddingLeft: 15, justifyContent: 'center'}}>
                    <Image source={require('../image/nav/nav/nav_icon_back2.png')} />
                </View>
            )
        }
    };

    constructor(props) {
        super(props);
    };

    render() {
        const {navigation} = this.props;
        const urlString = navigation.getParam('urlString', '');
        return (
           <WebView source={{uri: urlString}} style={styles.container}/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})