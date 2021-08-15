import React, { Component } from "react";
import { Typography, Card, Space } from 'antd';
import AppContext from './provider/AppContext'
import { ColorAvatar } from './ColorAvatar';
import { IAppConfig } from '../ITypes'

type IState = {
}

interface IProps {
}


export default class Account extends Component<IProps, IState>
{
    constructor(props: any) {
        super(props);

        this.state = {

        }

        this.title = this.title.bind(this);

    }


    title(context: IAppConfig | null) {

        return (
            <div className="title">
                <div>
                    <ColorAvatar text={context?.authUser?.username} src={context?.userSettings?.avatar} size={64} />
                </div>
                <div className="text">
                    Account
                </div>
            </div>
        );

    }

    roles(context: IAppConfig | null) {

        var rol = !context?.userSettings?.roles
        ? <></>
        : context.userSettings.roles.map( (value) => {
            return <span>{value}&nbsp;&nbsp;</span>
        });

        return (
            <>
            {rol}

            </>
        );

    }

    render() {

        return (
            <div className="Account">
                <AppContext.Consumer>
                    {context => (
                        <Card title={this.title(context)}>



                            <>
                                <p>
                                    <div className="lable">Username</div>
                                    <div className="item">{context?.authUser?.username}</div>
                                </p>

                                <p>
                                    <div className="lable">Email</div>
                                    <div className="item">{context?.authUser?.email}</div>
                                </p>

                                <p>
                                    <div className="lable">Roles</div>
                                    <div className="item">{this.roles(context)}</div>
                                </p>
                            </>




                        </Card>
                    )}
                </AppContext.Consumer>
            </div>
        );

    }

}