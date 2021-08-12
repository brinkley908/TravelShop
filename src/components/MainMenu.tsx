import react, { Component } from 'react'
import { ColorAvatar } from './ColorAvatar';
import Usercontext from '../components/provider/AppContext'
import Avatar from 'react-avatar-edit'
import { Modal, Button } from 'antd';
import { Auth } from "aws-amplify";

import '../css/Menu.css'

type IState = {
    uploadVisible: boolean
    preview: string
    showUserMenu: boolean
}

interface IProps {
}

class MainMenu extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            uploadVisible: false,
            preview: "",
            showUserMenu: false
        }

        this.onClose = this.onClose.bind(this);
        this.onOk = this.onOk.bind(this);
        this.onCrop = this.onCrop.bind(this);

    }

    async signOut(e: any) {
        e.preventDefault();
        await Auth.signOut();
        window.location.reload();
      }

    onClose() {
        this.setState({ uploadVisible: false });
    }

    onOk() {

    }

    onCrop(preview: string) {
        this.setState({ preview: preview });
    }

    render() {

        return (
            <Usercontext.Consumer>
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
                                <ColorAvatar text={context?.authUser?.username} />
                            </div>
                            <div>
                                {context?.authUser?.username}
                            </div>
                        </div>

                        {this.state.showUserMenu &&
                            <ul className="user-menu">
                                <li><a href="#careers">My Account</a></li>
                                <li><a href="#careers">Upload Photo</a></li>
                                <li><a href="#careers">Enrole</a></li>
                                <li><a href="#contact"  onClick={this.signOut}>Sign out</a></li>
                            </ul>
                        }

                        <Modal
                            title="Upload your photo"
                            visible={this.state.uploadVisible}

                            // onOk={handleOk}
                            // confirmLoading={confirmLoading}
                            onCancel={this.onClose}
                            onOk={this.onOk}
                            footer={[
                                <>
                                    <Button onClick={this.onClose} >
                                        Cancel
                                    </Button>

                                    <Button key="submit" type="primary" onClick={this.onOk} disabled={this.state.preview === ""}>
                                        Upload
                                    </Button>
                                </>
                            ]}

                        >
                            <Avatar
                                width={390}
                                height={295}
                                onCrop={this.onCrop}

                            />
                        </Modal>


                    </div>

                )}
            </Usercontext.Consumer>
        );

    }


}


export default MainMenu