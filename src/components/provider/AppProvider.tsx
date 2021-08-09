import React, { Component } from 'react';
import AppContext from './AppContext';
import { IAuthUser, IAppSettings } from '../../ITypes'
import { getUser } from '../../authorisation/Auth';

type IState = {
    user: IAuthUser | null;
}

interface IProps {
}

export default class AppProvider extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            user: null
        }

    }

    async componentDidMount() {
        if (this.state.user === null) {
            await this.GetUser();
        }
    }

    async GetUser() {
        try {
            var user = await getUser();
            this.setState({ user: user });

            console.log('id Token: ' + JSON.stringify(user?.idToken));
            console.log('access token: ' + JSON.stringify(user?.accessToken));
        }
        catch (ex) {
            user = { username: 'guest', email: '', idToken: '', accessToken: '', tag: '' };
            this.setState({ user: user });
        }
    }


    render() {
        return (
            <AppContext.Provider
                value={{
                    authUser: this.state.user
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }

}