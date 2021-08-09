import React, { Component } from 'react';
import Usercontext from './components/provider/AppContext'

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
                     {context?.authUser?.username}
                    </>
     
                )}
            </Usercontext.Consumer>
        );
    }

}

export default AppRouter