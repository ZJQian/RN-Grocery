import React,{Component} from 'react';
import {Image} from 'react-native';

export default class tabBarItem extends Component {

    render() {
        return(
            <Image source={ this.props.focused ? this.props.selectedImage : this.props.normalImage }
                   style={ { tintColor:this.props.tintColor,width:22,height:22 } }
            />
        )
    }

}