import { Layout, Tabs, Button, Skeleton } from 'antd';
import './App.less';
import React from 'react';
import { CustomHeader } from './components/header';
import Home from './components/home';
import SetOpacity from './components/header/SetOpacity';
import {
  UserOutlined,
  SearchOutlined,
  StarOutlined,

}
  from '@ant-design/icons';
const { Content, Header } = Layout;
const { TabPane } = Tabs;

function callback(params) {

}
function clickTab(e) {
  console.log("e", e);
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        '我的音乐',
        '发现',
        '直播',
        '探索',
        '手机Play'
      ],
      loadingFlag: true
    };
  }
  changeSize = (e, size) => {
    console.log("size");
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loadingFlag: false
      })
    }, 200)
  }
  changeOpacity = (value) => {
    document.body.style.background = `rgba(46,103,156, ${value})`;
  }
  render() {
    let renderDom = this.state.tabs.map((item, index) => {
      let nodeItem;
      switch (index) {
        case 0:
          nodeItem = <UserOutlined />
          break;
        case 1:
          nodeItem = <SearchOutlined />
          break;
        case 2:
          nodeItem = <StarOutlined />
          break;
        default:
          nodeItem = ""
          break;
      }
      return (
        <TabPane tab={
          <span>
            {nodeItem}
            {item}
          </span>
        } key={index} onClick={clickTab}>
          {index + item}
          <Home index={index} />
        </TabPane>
      )
    })

    return (
      <Skeleton active loading={this.state.loadingFlag} rows={20}>
        <Layout className="main-content">
          <Layout>
            <Header className="header webkit-no-drag" onDoubleClick={(e) => { this.changeSize(e, "max") }}>
              <CustomHeader changeOpacity={(value) => { this.changeOpacity(value) }} />
            </Header>
            <Content style={{ padding: '15px 20px', minHeight: 500 }}>
              <Tabs defaultActiveKey="0" onChange={callback}>
                {renderDom}
              </Tabs>
              <SetOpacity />
              <Button onClick={clickTab}>确定</Button>
            </Content>
          </Layout>
        </Layout>
      </Skeleton>
    )
  }
}
