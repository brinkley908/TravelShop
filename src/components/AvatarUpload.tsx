import react, { Component } from 'react'
import Avatar from 'react-avatar-edit'
import { Modal, Button } from 'antd';
import { Post } from '../authorisation/API';

type IState = {
    preview: string,
    name: string
}

interface IProps {
    visible: boolean
    onClose?: any
    onUpload?: any
    username: string | null | undefined
}


export default class AvatarUpload extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            preview: "",
            name: this.formatName()
        }

        this.onClose = this.onClose.bind(this);
        this.onOk = this.onOk.bind(this);
        this.onCrop = this.onCrop.bind(this);

    }

    formatName(): string {
        if (this.props.username === null || this.props.username === undefined)
            return "";

        return this.props.username;

    }

    onClose() {

        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    onOk() {

        var body ={
            bucketName: "",
            payload: this.state.preview,
            name: this.props.username
        }

        Post(`user/UploadAvatar`, body)
        .then(result => {
            if (this.props.onUpload) {
                this.props.onUpload(this.state.preview);
            }
            })
        .catch(function (error) {
            console.log(error);
        });

        this.onClose();

    }

    onCrop(preview: string) {
        this.setState({ preview: preview });
    }

    render() {

        return (

            <Modal

                title="Upload your photo"
                visible={this.props.visible && this.state.name !== ""}

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


        );

    }

}

