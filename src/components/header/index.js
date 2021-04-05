import { Row, Col, Input, Space } from 'antd';
import React from 'react';
import './index.less';
import '../../App.less';
import {
    // AudioOutlined, 
    MinusOutlined,
    ExpandOutlined,
    CloseOutlined,
    ReloadOutlined,
    BorderOutlined,
    // SearchOutlined,
    // ScanOutlined,
    // ShareAltOutlined, 
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

function changeWindowSize(e, todo) {
    if (todo) {
        ipcRenderer.send("changeWinSize", todo)
        if (todo === "maximize") {

        }
    }
}
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMinOrMax: "min"
        }
    }
    render() {
        // const renderDom = this.state.showMinOrMax === "min" ?
        // <BorderOutlined onClick={(e) => changeWindowSize(e, "maximize")} className="webkit-no-drag" />
        //                     <ExpandOutlined onClick={(e) => changeWindowSize(e, "normal")} className="webkit-no-drag" />
        return (
            <>
                <Row className="site-page-header" align="middle">
                    <Col span={8}>
                        <Space className="flex-type flex-justify-end">
                            <ReloadOutlined className="webkit-no-drag" />
                            {/* <SearchOutlined /> */}
                            {/* <ScanOutlined /> */}
                            {/* <ShareAltOutlined /> */}
                            <LeftOutlined className="webkit-no-drag" />
                            {/* 分享 */}
                        </Space>
                    </Col>
                    <Col span={8} className="flex-type">
                        <Search className="flex-align-mid webkit-no-drag" placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                    </Col>
                    <Col span={8}>
                        <Space className="flex-type flex-justify-end">
                            <MinusOutlined onClick={(e) => changeWindowSize(e, "minimize")} className="webkit-no-drag" />
                            <BorderOutlined onClick={(e) => changeWindowSize(e, "maximize")} className="webkit-no-drag" />
                            <ExpandOutlined onClick={(e) => changeWindowSize(e, "normal")} className="webkit-no-drag" />
                            <CloseOutlined onClick={(e) => changeWindowSize(e, "close")} className="webkit-no-drag" />
                        </Space>
                    </Col>
                </Row>
            </>
        )
    }
}
export {
    Header as CustomHeader
}