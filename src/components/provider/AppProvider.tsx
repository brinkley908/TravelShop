import React, { Component } from 'react';
import AppContext from './AppContext';
import { IAuthUser, IUserSettings, IAppConfig, IAPIResults, IAppSettings, AppStatus } from '../../ITypes'
import { getUser } from '../../authorisation/Auth';
import { Post } from '../../authorisation/API';


const env = require('../../lib/env');

type IState = {
    status: AppStatus
    user: IAuthUser | null;
    userSettings: IUserSettings | null
    appSettings: IAppSettings | null
    progressMessage: string
}
interface IProps {
}

export default class AppProvider extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            status: AppStatus.loading,
            user: null,
            userSettings: null,
            appSettings: null,
            progressMessage: ""
        }

        this.SetMessage = this.SetMessage.bind(this);
        this.GetUser = this.GetUser.bind(this);
        this.GetAppConfig = this.GetAppConfig.bind(this);

    }

    async componentDidMount() {
        if (this.state.user === null) {
            await this.GetUser();

            if (this.state.status !== AppStatus.failure)
                this.GetAppConfig();
        }

    }

    SetMessage(message: string): void {
        this.setState({ progressMessage: message });
    }

    async GetUser() {
        try {
            this.SetMessage("login you in...");

            var user = await getUser();
            this.setState({ user: user });
            this.SetMessage("User logged in...");

            console.log('id Token: ' + JSON.stringify(user?.idToken));
            console.log('access token: ' + JSON.stringify(user?.accessToken));
        }
        catch (ex) {
            user = { username: 'guest', email: '', idToken: '', accessToken: '', tag: '' };
            this.setState({ user: user, status: AppStatus.failure });
            this.SetMessage("User log in error.");
        }
    }

    GetAppConfig() {
        var $this = this;

        this.SetMessage("Spinning up cloud services and finding your settings...");

        var body = {
            "environment": env.GetEnv(),
            "username": this.state.user?.username
        }

        Post(`app/GetAppConfig`, body)
            .then(result => {
                this.setState({ appSettings: result?.data?.appSettings, userSettings: result?.data?.userSettings, status: AppStatus.success });
                this.SetMessage("User settings loaded.");
            })
            .catch(function (error) {
                console.log(error);
                $this.setState({ status: AppStatus.failure });
                $this.SetMessage("An error occured loading your settings.");
            });

    }

    render() {
        return (
            <AppContext.Provider
                value={{
                    authUser: this.state.user,
                    userSettings: this.state.userSettings,
                    appSettings: this.state.appSettings,
                    status: this.state.status,
                    progressMessage: this.state.progressMessage,

                    setAvatar: (avatar: string) => {
                        var user = this.state.userSettings;
                        if (user) {
                            user.avatar = avatar;
                            this.setState({userSettings: user})
                        }
                    }
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }

}