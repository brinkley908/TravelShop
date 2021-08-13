import react, { Component } from 'react'
import AppContext from '../components/provider/AppContext'
import { ColorAvatar } from './ColorAvatar';
import AvatarUpload from "./AvatarUpload";
import { Auth } from "aws-amplify";

import '../css/Menu.css'

type IState = {
    uploadVisible: boolean
    showUserMenu: boolean
}

interface IProps {
}

class MainMenu extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            uploadVisible: false,
            showUserMenu: false
        }


    }

    async signOut(e: any) {
        e.preventDefault();
        await Auth.signOut();
        window.location.reload();
    }

    

    render() {

        return (
            <AppContext.Consumer>
                {context => (
                    <div className="MainMenu">
                        <input className="menu-btn" type="checkbox" id="menu-btn" />
                        <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                        <ul className="menu">
                            <li><a href="#work">Our Work</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#careers">Careers</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>

                        <div className="avatar" onClick={() => this.setState({ showUserMenu: !this.state.showUserMenu })}>
                            <div className="icon">
                                <ColorAvatar text={context?.authUser?.username} src={context?.userSettings?.avatarId ?? ""} />
                            </div>
                            <div>
                                {context?.authUser?.username}
                            </div>
                        </div>

                        {this.state.showUserMenu &&
                            <ul className="user-menu">
                                <li><a href="#careers">My Account</a></li>
                                <li><a href="#careers" onClick={() => this.setState({ uploadVisible: true })}>Upload Photo</a></li>
                                <li><a href="#careers">Enrole</a></li>
                                <li><a href="#contact" onClick={this.signOut}>Sign out</a></li>
                            </ul>
                        }

                        <AvatarUpload visible={this.state.uploadVisible} onClose={() => this.setState({uploadVisible: false})} email={context?.authUser?.email} />

                    </div>

                )}
            </AppContext.Consumer>
        );

    }


}


export default MainMenu