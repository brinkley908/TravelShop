import React, { Component } from 'react';
import { Avatar } from 'antd';
import { StringToColor } from '../lib/travelshop';


import 'antd/dist/antd.css';

interface IProps {
    text?: string
    style?: any
    alt?: string
    gap?: number
    shape?: any
    size?: any
    src?: string | React.ReactNode
    srcSet?: string
    draggable?: false
    onError?: any
}


interface IState {

}


export class ColorAvatar extends Component<IProps, IState>
{

   
    render() {

        const initial = this.props.text ?? "?";
        const color = StringToColor(initial);

        return (

            <Avatar
                alt={this.props.alt}
                style={this.props.style ?? { backgroundColor: color, verticalAlign: 'middle', }}
                gap={this.props.gap}
                shape={this.props.shape}
                size={this.props.size}
                src={this.props.src}
                srcSet={this.props.srcSet}
                draggable={this.props.draggable}
                onError={this.props.onError}
            >

                {initial.substr(0, 1).toUpperCase()}

            </Avatar>

        );

    }
}

