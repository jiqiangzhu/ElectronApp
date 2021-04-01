import { Layout, Tabs } from 'antd';
import './App.less';
import React from 'react';
import { CustomHeader } from './components/header';
const { Content, Header } = Layout;
const { TabPane } = Tabs;

function callback(params) {

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
      ]
    };
  }
  render() {
    let renderDom = this.state.tabs.map((item, index) => {
      return (
        <TabPane tab={item} key={index}>
          {index}
        </TabPane>
      )
    })
    return (
      <Layout className="main-content">
        <Layout>
          <Header className="header">
            <CustomHeader />
          </Header>
          <Content style={{ padding: '0 20px', minHeight: 500 }}>
            <Tabs defaultActiveKey="0" onChange={callback}>
              {renderDom}
            </Tabs>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
