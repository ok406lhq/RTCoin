import React, {Component} from 'react';

import ButtonSubmit from '../../common/ButtonSubmit';

export default class LoginScreen extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <ButtonSubmit navigate={this.props.navigation.navigate}/>
        );
    }
}
