import React, {Component} from 'react';

import LoginView from '../../common/LoginView';

export default class LoginScreen extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <LoginView navigate={this.props.navigation.navigate}/>
        );
    }
}
