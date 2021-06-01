import { Row, Col, Input, Space, Modal, Slider, Dropdown, Menu } from 'antd';
import React from 'react';
import './index.less';
import '../../App.less';
import windowUtils from '@localUtils/window-util';
import { getUserInfor } from '../../api/index'
import { createFromIconfontCN } from '@ant-design/icons';
import { SkinOutlined } from '@ant-design/icons';

const IconFont = createFromIconfontCN();
const { Search } = Input;

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            nickname: "",
            isMax: true,
            inputValue: ""
        };
    };
    onInputChange = e => {
        this.setState({
            inputValue: e.target.dataset.defaultValue
        })
    };
    handleMenuClick = e => {
        if (e.key === '3') {
            this.setState({ showMenu: false });
        }
    };

    handleVisibleChange = flag => {
        this.setState({ showMenu: flag });
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    hideModal = () => {
        this.setState({
            visible: false,
        });
    };
    closeModal = () => {
        this.hideModal();
        windowUtils.setWindowClosed();
    }
    async componentDidMount() {
        let result = await getUserInfor();
        console.log("get user info-------------", result);
        this.setState({
            nickname: result.data.profile.nickname
        })
    };
    // Send the command to MainProgress min max restore window
    changeWindowSize = async (e, todo) => {
        if (todo === "maxormin") {
            if (this.state.isMax) {
                await windowUtils.setWindowMax();
            } else {
                await windowUtils.setWindowRestore();
            }
            this.setState({
                isMax: !this.state.isMax
            })
        } else if (todo === "close") {
            this.showModal();
            return;
        } else if (todo === "minimize") {
            await windowUtils.setWindowMin();
        }

    };
    onChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    };
    onSearch = (value) => {
        console.log("onSearch--------", value);
        if (!value) {
            // warning("搜索内容不可为空，请检查");
            return;
        }
    };
    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick} theme="dark">
                <Menu.Item key="1">
                    <SetOpacityCom className="webkit-no-drag" defaultValue={this.props.defaultValue} changeOpacity={(value) => this.props.changeOpacity(value)} />
                </Menu.Item>
                <Menu.Item key="2" style={{ fontSize: '15px' }} onClick={(e) => { this.changeWindowSize(e, 'close') }} >
                    <IconFont className="webkit-no-drag" type='icon-setting' />
                    Setting
                </Menu.Item>
                <Menu.Item key="3">

                </Menu.Item>
            </Menu>
        );
        return (
            <>
                <Row align="middle" style={{ width: "100%" }} >
                    <Col span={2}>
                        <Space>
                            <IconFont onClick={(e) => { this.changeWindowSize(e, 'close') }} className="webkit-no-drag" type='icon-circle-copy-red' />
                            {/* <Tooltip title={this.state.isMax === true ? "最大化" : "最小化"} color="rgb(76, 78, 78, 0.3)" defaultVisible={false}> */}
                            <IconFont onClick={(e) => { this.changeWindowSize(e, 'maxormin') }} className="webkit-no-drag" type='icon-circle' />
                            {/* </Tooltip> */}
                            <IconFont onClick={(e) => { this.changeWindowSize(e, 'minimize') }} className="webkit-no-drag" type='icon-circle-copy-green' />
                        </Space>
                    </Col>
                    <Col offset={0} span={20} >
                        <Space className="flex-type flex-align-mid">
                            <IconFont style={{ fontSize: '15px' }} className="webkit-no-drag" type='icon-ziyuan1' />
                            <IconFont style={{ fontSize: '16px' }} className="webkit-no-drag" type='icon-you' />
                            <Search
                                allowClear={true}
                                className="webkit-no-drag flex-type flex-align-mid"
                                placeholder="Please Input..."
                                size="small"
                                prefix={<IconFont onClick={() => this.onSearch(this.state.inputValue)} style={{ fontSize: '16px' }} type='icon-sousuo' />}
                                onSearch={this.onSearch}
                                onChange={this.onChange}
                                style={{ width: 200 }}
                            />
                        </Space>
                    </Col>
                    <Col span={2}>
                        <Space className="flex-type flex-justify-start flex-align-mid">
                            <Dropdown
                                overlay={menu}
                                onVisibleChange={this.handleVisibleChange}
                                placement="bottomLeft"
                            >
                                <IconFont onClick={e => e.preventDefault()} style={{ fontSize: '17px' }} className="webkit-no-drag" type='icon-icon_huabanfuben1' />
                            </Dropdown>

                        </Space>
                    </Col>
                </Row>
                {/* confirm exit modal */}
                <Modal
                    visible={this.state.visible}
                    onOk={this.closeModal}
                    onCancel={this.hideModal}
                    okText="Confirm"
                    maskClosable={false}
                    cancelText="Cancel"
                    width="250px"
                    centered
                    focusTriggerAfterClose={false}
                    bodyStyle={{
                        backgroundColor: 'rgb(90, 94, 94)',
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px'
                    }}
                >
                    <p>Confirm Exit</p>
                </Modal>
            </>
        )
    }
}

/**
 * set app window opacity
 * @param {*} props 
 * @returns 
 */
function SetOpacityCom(props) {
    const style = {
        display: 'inline-block',
        height: 300,
        marginLeft: 70,
    };
    const menu = (
        <div style={style}>
            <Slider vertical max={100} min={78} step={1} style={{height: '50%'}} defaultValue={props.defaultValue * 100} onChange={(value) => props.changeOpacity(value / 100)} />
        </div>
    );
    return (
        <Dropdown overlay={menu} trigger={['click']} placement='topCenter'>
            <Space className="webkit-no-drag">
                <SkinOutlined />
                Window Opacity
            </Space>
        </Dropdown>
    )
}

export {
    Header as CustomHeader
}