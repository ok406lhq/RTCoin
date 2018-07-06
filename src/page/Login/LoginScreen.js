import React, {Component} from 'react';
import Logo from '../../common/Logo';
import Form from '../../common/Form';
import Wallpaper from '../../common/Wallpaper';
import ButtonSubmit from '../../common/ButtonSubmit';
import SignupSection from '../../common/SignupSection';
import StatusBar from "react-native";


export default class LoginScreen extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <Wallpaper>
                <Logo/>
                <Form/>
                <SignupSection navigate={this.props.navigation.navigate}/>
                <ButtonSubmit navigate={this.props.navigation.navigate}/>
            </Wallpaper>
        );
    }
}
