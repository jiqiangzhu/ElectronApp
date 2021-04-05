import { Layout, Tabs, Button } from 'antd';
import './App.less';
import React from 'react';
import { CustomHeader } from './components/header';
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
      ]
    };
  }
  render() {
    let renderDom = this.state.tabs.map((item, index) => {
      return (
        <TabPane tab={item} key={index} onClick={clickTab}>
          {index + item}
        </TabPane>
      )
    })
    return (
      <Layout className="main-content">
        <Layout>
          <Header className="header webkit-drag">
            <CustomHeader />
          </Header>
          <Content style={{ padding: '0 20px', minHeight: 500 }}>
            <Tabs defaultActiveKey="0" onChange={callback}>
              {renderDom}
            </Tabs>
            <Button onClick={clickTab}>确定</Button>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
