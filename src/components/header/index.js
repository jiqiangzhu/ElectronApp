import { Row, Col, Input, Space, Modal } from 'antd';
import React from 'react';
import './index.less';
import '../../App.less';
import { getUserInfor } from '../../api/index'
import { createFromIconfontCN } from '@ant-design/icons';

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
            nickname: ""
        }
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
        // ipcRenderer.send("changeWinSize", "close");
    }
    async componentDidMount() {
        let result = await getUserInfor();
        console.log("获取用户个人信息-------------", result);
        this.setState({
            nickname: result.data.profile.nickname
        })
    };
    // 向主进程发送请求指令 最小化 最大化，关闭窗口
    changeWindowSize = (e, todo) => {
        if (todo) {
            if (todo === "close") {
                this.showModal();
            }
            ipcRenderer.send("changeWinSize", todo);

        }
    };
    render() {
        return (
            <>
                <Row className="site-page-header" align="middle">
                    <Col span={5} className="flex-type flex-justify-evenly">
                        <Space >
                            <IconFont onClick={(e) => { this.changeWindowSize(e, 'close') }} style={{ fontSize: '16px' }} className="webkit-no-drag" type='icon-cuowuguanbiquxiao-yuankuang' />
                            <IconFont onClick={(e) => { this.changeWindowSize(e, 'maxornormal') }} style={{ fontSize: '14px' }} className="webkit-no-drag" type='icon-circle' />
                            <IconFont onClick={(e) => { this.changeWindowSize(e, 'minimize') }} style={{ fontSize: '15px' }} className="webkit-no-drag" type='icon-jian-yuankuang' />
                        </Space>
                    </Col>
                    <Col offset={1} span={8} className="flex-type">
                        <Search size="small" className="flex-align-mid webkit-no-drag" placeholder="请输入..." onSearch={onSearch} style={{ width: 200 }} />
                    </Col>
                    <Col span={8}>
                        <Space className="flex-type webkit-no-drag flex-justify-start flex-align-mid">

                        </Space>
                    </Col>
                </Row>
                <Modal
                    visible={this.state.visible}
                    onOk={this.closeModal}
                    onCancel={this.hideModal}
                    okText="确认"
                    maskClosable={false}
                    cancelText="取消"
                    width="250px"
                    focusTriggerAfterClose={false}
                    bodyStyle={{
                        backgroundColor: 'rgb(138, 145, 145)',
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
// function SetOpacityCom(props) {
//     const style = {
//         display: 'inline-block',
//         height: 300,
//         marginLeft: 70,
//     };
//     const menu = (
//         <div style={style}>
//             <Slider vertical max={1} step={0.1} className="mySliderStyle" defaultValue={props.defaultValue} onChange={(value) => props.changeOpacity(value)} />
//         </div>
//     );
//     return (
//         <Dropdown overlay={menu} trigger={['click']} placement='topCenter'>
//             <SkinOutlined className="webkit-no-drag" />
//         </Dropdown>
//     )
// }

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