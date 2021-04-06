import { Row, Col, Input, Space, Tooltip, Image } from 'antd';
import React from 'react';
import './index.less';
import '../../App.less';
import imgPath from '../../assets/img/avatar.jpg';
import { getUserInfor } from '../../api/index'
import {
    MinusOutlined,
    ExpandOutlined,
    CloseOutlined,
    ReloadOutlined,
    BorderOutlined,
    PushpinOutlined,
    HourglassOutlined,
    LeftOutlined
} from '@ant-design/icons';

const { Search } = Input;

const onSearch = value => console.log(value);

// const routes = [
//     {
//         path: 'index',
//         breadcrumbName: 'First-level Menu',
//     },
//     {
//         path: 'first',
//         breadcrumbName: 'Second-level Menu',
//     },
//     {
//         path: 'second',
//         breadcrumbName: 'Third-level Menu',
//     },
// ];
// const { ipcRenderer } = require("electron");
// const {ipcRenderer} = electron;

// Renderer Process

const { ipcRenderer } = window.require('electron')

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMinOrMax: "normal",
            fixedTopFlag: "fixedOnTop",
            nickname: ""
        }
    }
    async componentDidMount() {
        let result = await getUserInfor();
        console.log("获取用户个人信息-------------", result);
        this.setState({
            nickname: result.data.profile.nickname
        })
    }
    changeWindowSize = (e, todo) => {
        if (todo) {
            ipcRenderer.send("changeWinSize", todo);
            if (todo === "cancelOnTop") {
                this.setState({
                    fixedTopFlag: "fixedOnTop"
                })
            } else if (todo === "fixedOnTop") {
                this.setState({
                    fixedTopFlag: "cancelOnTop"
                })
            } else if (todo === "normal") {
                this.setState({
                    showMinOrMax: "maximize"
                })
            } else if (todo === "maximize") {
                this.setState({
                    showMinOrMax: "normal"
                })
            }
        }
    }

    render() {

        return (
            <>
                <Row className="site-page-header" align="middle">
                    <Col span={7} className="flex-type flex-justify-evenly">
                        <Space className="flex-type webkit-no-drag flex-justify-start flex-align-mid">
                            <Image width={40} src={imgPath} className="padding-top5 border-radius-5" />
                            <label className="my-font">{this.state.nickname}</label>
                        </Space>
                        <Space className="flex-type flex-justify-end">
                            <ReloadOutlined className="webkit-no-drag" />
                            <LeftOutlined className="webkit-no-drag" />
                        </Space>
                    </Col>
                    <Col offset={1} span={8} className="flex-type">
                        <Search className="flex-align-mid webkit-no-drag all-screen" placeholder="请输入..." onSearch={onSearch} style={{ width: 200 }} />
                    </Col>
                    <Col span={8}>
                        <Space className="flex-type flex-justify-end">

                            <TopByPropsCom renderCom={this.state.fixedTopFlag} onClick={(e) => { this.changeWindowSize(e, this.state.fixedTopFlag) }} />
                            <Tooltip title="最小化窗口" defaultVisible={false} color="transparent">
                                <MinusOutlined onClick={(e) => this.changeWindowSize(e, "minimize")} className="webkit-no-drag" />
                            </Tooltip>
                            <ShowMaxOrMinCom showWhat={this.state.showMinOrMax} onClick={(e) => this.changeWindowSize(e, this.state.showMinOrMax)} />
                            <Tooltip title="退出" defaultVisible={false} color="transparent">
                                <CloseOutlined onClick={(e) => this.changeWindowSize(e, "close")} className="webkit-no-drag" />
                            </Tooltip>
                        </Space>
                    </Col>
                </Row>
            </>
        )
    }
}

function ShowMaxOrMinCom(props) {
    if (props.showWhat === "normal") {
        return (
            <Tooltip title="最大化" trigger="hover" color="transparent">
                <BorderOutlined onClick={props.onClick} className="webkit-no-drag" />
            </Tooltip>
        )
    } else if ((props.showWhat === "maximize")) {
        return (
            <Tooltip title="恢复" trigger="hover" color="transparent">
                <ExpandOutlined onClick={props.onClick} className="webkit-no-drag" />
            </Tooltip>
        )

    }

}
function TopByPropsCom(props) {
    if (props.renderCom === "cancelOnTop") {
        return (
            <Tooltip title="取消置顶" trigger="hover" color="transparent">
                <HourglassOutlined onClick={props.onClick} className="webkit-no-drag" />
            </Tooltip>
        )
    } else if (props.renderCom === "fixedOnTop") {
        return (
            <Tooltip title="置顶" trigger="hover" color="transparent">
                <PushpinOutlined onClick={props.onClick} className="webkit-no-drag" />
            </Tooltip>
        )
    }

}
export {
    Header as CustomHeader
}