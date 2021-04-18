import { Layout, Tabs, Skeleton } from 'antd';
import './App.less';
import React from 'react';
import { CustomHeader } from './components/header';
import {LiveCom, DiscoveryCom, Home, MobilePlayCom, ExploreCom} from './components/main';
import {
  UserOutlined,
  SearchOutlined,
  StarOutlined
}
  from '@ant-design/icons';
// import { Route, Link, Switch } from 'react-router-dom';
const { Content, Header } = Layout;
const { TabPane } = Tabs;

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
      loadingFlag: true,
      opacityVallue: 0
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loadingFlag: false
      })
    }, 200)

    // 设置透明度
    if (localStorage.opacityVallue && localStorage.opacityVallue !== "0") {
      this.changeOpacity(localStorage.opacityVallue * 1);
    }
  }

  changeOpacity = (value) => {
    document.body.style.background = `rgba(46,103,156, ${value})`;
    localStorage.opacityVallue = value;
  }

  render() {
    let renderDom = this.state.tabs.map((item, index) => {
      let nodeItem,
          rendertab;
      switch (index) {
        case 0:
          nodeItem = <UserOutlined />
          rendertab = <Home />
          break;
        case 1:
          nodeItem = <SearchOutlined />
          rendertab = <DiscoveryCom />
          break;
        case 2:
          nodeItem = <StarOutlined />
          rendertab = <LiveCom />
          break;
        case 3:
          nodeItem = ''
          rendertab = <ExploreCom />
          break;
        case 4:
          nodeItem = ''
          rendertab = <MobilePlayCom />
          break;
        default:
          nodeItem = <UserOutlined />
          rendertab = <Home />
          break;
      }
      return (
        <TabPane tab={
          <span>
            {nodeItem}
            {item}
          </span>
        } key={index} onClick={clickTab}>
          {rendertab}
        </TabPane>
      )
    })

    return (
      <Skeleton active loading={this.state.loadingFlag} rows={20}>
        <Layout className="main-content">
          <Layout>
            <Header className="header webkit-no-drag">
              <CustomHeader defaultValue={localStorage.opacityVallue * 1} changeOpacity={(value) => { this.changeOpacity(value) }} />
            </Header>
            <Content style={{ padding: '15px 20px', minHeight: 500 }}>
              <Tabs defaultActiveKey="0" onChange={(params) => callback(params)}>
                {renderDom}
              </Tabs>
            </Content>
          </Layout>
        </Layout>
      </Skeleton>
    )
  }
}

function callback(params) {
  // let result;
  // switch (params) {
  //   case '0':
  //     result = `<div>我的音乐页</div>`
  //     break;
  //   case '1':
  //     result = `<div>发现页</div>`
  //     break;
  //   case '2':
  //     result = `<div>直播页</div>`
  //     break;
  //   case '3':
  //     result = `<div>探索页</div>`
  //     break;
  //   case '4':
  //     result = `<div>手机Play页</div>`
  //     break;
  //   default:
  //     result = `<div>我的音乐页</div>`
  //     break;
  // }
  // return (
  //   result
  // )
}
function clickTab(e) {
  console.log("e", e);
}