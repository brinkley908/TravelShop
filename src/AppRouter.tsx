import React, { Component } from 'react';
import AppContext from './components/provider/AppContext'
import { IUserSettings, IAppConfig, AppStatus } from './ITypes';
import MainMenu from './components/MainMenu'
import { Spin, Space } from 'antd';
import { BrowserRouter as Router, Route, RouteComponentProps, NavLink } from 'react-router-dom';


import Account from './components/Account';

import './css/App.css';

type IState = {
    route: string
    userSettings: IUserSettings | null
}

interface IProps {
}

class AppRouter extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            route: "/",
            userSettings: null
        }

        this.loadContents = this.loadContents.bind(this);
        this.loadApp = this.loadApp.bind(this);
        this.failure = this.failure.bind(this);
    }


    loading(context: IAppConfig | null) {
        return (
            <>
                <div className="App">
                    <div>
                        <h3>{context?.progressMessage}</h3>
                    </div>
                    <div>
                        <Space size="middle">
                            <Spin size="small" />
                            <Spin />
                            <Spin size="large" />
                        </Space>,
                    </div>
                </div>
            </>
        );
    }

    failure() {
        return (
            <>
                We were unable to log you in.
            </>
        );
    }

    loadApp() {
        return (
            <Router>
                <MainMenu />
                <div className="App">
                    <Route exact path="/Account"
                        render={(props) =>
                            <Account {...props} />
                        } />
                </div>
            </Router>

        );
    }

    loadContents(context: IAppConfig | null) {
        switch (context?.status) {
            case AppStatus.loading: return this.loading(context)
            case AppStatus.success: return this.loadApp();
            default: return this.failure();
        }
    }

    render() {
        return (

            <AppContext.Consumer>
                {context => (
                    <>
                        {this.loadContents(context)}
                    </>
                )}
            </AppContext.Consumer>


        );
    }

}

export default AppRouter