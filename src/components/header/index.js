import { Row, Col, Input, Space, Modal, Tooltip, Slider, Dropdown, Menu } from 'antd';
import React from 'react';
import './index.less';
import '../../App.less';
import windowUtils from '@localUtils/windowUtils.js';
import { getUserInfor } from '../../api/index'
import { createFromIconfontCN } from '@ant-design/icons';
import {
    SkinOutlined
} from '@ant-design/icons';
const IconFont = createFromIconfontCN();
const { Search } = Input;

const onSearch = (value) => {
    console.log(value);

}
// 渲染进程
const { ipcRenderer } = window.require('electron')

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            nickname: "",
            fullScreen: false,
            isTop: '置顶',
            isMax: true,
            showMenu: true
        }
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
        ipcRenderer.send("changeWinSize", "close");
    }
    async componentDidMount() {
        let result = await getUserInfor();
        console.log("获取用户个人信息-------------", result);
        this.setState({
            nickname: result.data.profile.nickname
        })
    };
    // 向主进程发送请求指令 最小化 最大化，关闭窗口
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
        }

    };
    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick} theme="dark">
                <Menu.Item key="1">
                    <SetOpacityCom className="webkit-no-drag" defaultValue={this.props.defaultValue} changeOpacity={(value) => this.props.changeOpacity(value)} />
                </Menu.Item>
                <Menu.Item key="2">

                </Menu.Item>
                <Menu.Item key="3">

                </Menu.Item>
            </Menu>
        );
        return (
            <>
                <Row align="middle" style={{ width: "100%" }} >
                    {/* <Col style={{ position: 'fixed', left: '12px', top: '4px' }}> */}
                    <Col span={2}>
                        <Space>
                            <IconFont onClick={(e) => { this.changeWindowSize(e, 'close') }} style={{ fontSize: '16px' }} className="webkit-no-drag" type='icon-cuowuguanbiquxiao-yuankuang' />
                            <Tooltip title={this.state.isMax === true ? "最大化" : "最小化"} color="rgb(76, 78, 78, 0.3)" defaultVisible={false}>
                                <IconFont onClick={(e) => { this.changeWindowSize(e, 'maxormin') }} style={{ fontSize: '14px' }} className="webkit-no-drag" type='icon-circle' />
                            </Tooltip>
                            <IconFont onClick={(e) => { this.changeWindowSize(e, 'minimize') }} style={{ fontSize: '15px' }} className="webkit-no-drag" type='icon-jian-yuankuang' />
                        </Space>
                    </Col>
                    <Col offset={0} span={20} >
                        <Space className="flex-type flex-align-mid">
                            <IconFont style={{ fontSize: '15px' }} className="webkit-no-drag" type='icon-ziyuan1' />
                            <IconFont style={{ fontSize: '16px' }} className="webkit-no-drag" type='icon-you' />
                            <Search size="small" className="flex-align-mid webkit-no-drag" placeholder="请输入..." onSearch={onSearch} style={{ width: 200 }} />
                        </Space>
                    </Col>
                    <Col span={2}>
                        <Space className="flex-type flex-justify-start flex-align-mid">
                            <Dropdown
                                overlay={menu}
                                onVisibleChange={this.handleVisibleChange}
                                visible={this.state.showMenu}
                                placement="bottomCenter"
                            >
                                <IconFont onClick={e => e.preventDefault()} style={{ fontSize: '15px' }} className="webkit-no-drag" type='icon-icon_huabanfuben1' />
                            </Dropdown>
                        </Space>
                    </Col>
                </Row>
                {/* 退出确认弹框 */}
                <Modal
                    visible={this.state.visible}
                    onOk={this.closeModal}
                    onCancel={this.hideModal}
                    okText="确认"
                    maskClosable={false}
                    cancelText="取消"
                    width="250px"
                    centered
                    focusTriggerAfterClose={false}
                    bodyStyle={{
                        backgroundColor: 'rgb(90, 94, 94)',
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px'
                    }}
                >
                    <p>确认退出吗？</p>
                </Modal>
            </>
        )
    }
}

/**
 * 设置窗口透明度
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
            <Slider vertical max={1} step={0.1} className="mySliderStyle" defaultValue={props.defaultValue} onChange={(value) => props.changeOpacity(value)} />
        </div>
    );
    return (
        <Dropdown overlay={menu} trigger={['click']} placement='topCenter'>
            <Space className="webkit-no-drag">
                <SkinOutlined />
                <span>设置窗口透明度</span>
            </Space>
        </Dropdown>
    )
}

/**
 * 设置窗口最大最小化
 * @param {*} props 
 * @returns 
 */
// function ShowMaxOrMinCom(props) {
//     if (props.showWhat === "maximize") {
//         return (
//             <ExpandOutlined onClick={props.onClick} className="webkit-no-drag" />
//         )
//     } else if ((props.showWhat === "normal")) {
//         return (
//             <BorderOutlined onClick={props.onClick} className="webkit-no-drag" />
//         )

//     }

// }

/**
 * 设置是否固定在最上方
 * @param {*} props 
 * @returns 
 */
// function TopByPropsCom(props) {
//     if (props.renderCom === "cancelOnTop") {
//         return (
//             <Tooltip title="取消置顶" trigger="hover" color="transparent">
//                 <HourglassOutlined onClick={props.onClick} className="webkit-no-drag" />
//             </Tooltip>
//         )
//     } else if (props.renderCom === "fixedOnTop") {
//         return (
//             <Tooltip title="置顶" trigger="hover" color="transparent">
//                 <PushpinOutlined onClick={props.onClick} className="webkit-no-drag" />
//             </Tooltip>
//         )
//     }

// }


export {
    Header as CustomHeader
}