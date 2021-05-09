import { Row, Col, Input, Space, Modal, Slider, Dropdown, Menu } from 'antd';
import React from 'react';
import './index.less';
import '../../App.less';
import windowUtils from '@localUtils/windowUtils.js';
import { getUserInfor } from '../../api/index'
import { createFromIconfontCN } from '@ant-design/icons';
import { SkinOutlined } from '@ant-design/icons';

const IconFont = createFromIconfontCN();
const { Search } = Input;
// const warning = (content) => {
//     message.warning(content, 1);
// };

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            nickname: "",
            fullScreen: false,
            isTop: '置顶',
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
                    设置中心
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
                                placeholder="请输入..."
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
                                placement="bottomCenter"
                            >
                                <IconFont onClick={e => e.preventDefault()} style={{ fontSize: '17px' }} className="webkit-no-drag" type='icon-icon_huabanfuben1' />
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
            <Slider vertical max={100} min={78} step={1} style={{height: '50%'}} defaultValue={props.defaultValue * 100} onChange={(value) => props.changeOpacity(value / 100)} />
        </div>
    );
    return (
        <Dropdown overlay={menu} trigger={['click']} placement='topCenter'>
            <Space className="webkit-no-drag">
                <SkinOutlined />
                窗口透明度
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