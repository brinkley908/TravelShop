import React, { Component } from 'react';
import Usercontext from './components/provider/AppContext'

const env = require('./lib/env');
type IState = {
    route: string
}

interface IProps {
}

 class AppRouter extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            route: "/"
        }

    }

    render() {
        return (
            <Usercontext.Consumer>
                {context => (
                    <>
                    <div>
                        Branch: {env.GetEnv()}
                    </div>
                    <div>
                        User: {context?.authUser?.username}
                    </div>
                    </>
     
                )}
            </Usercontext.Consumer>
        );
    }

}

export default AppRouter