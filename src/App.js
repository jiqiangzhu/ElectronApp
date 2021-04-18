import { Layout, Tabs, Button, Skeleton } from 'antd';
import './App.less';
import React from 'react';
import { CustomHeader } from './components/header';
import Home from './components/home';
import Detail from './components/detail';
import {
  UserOutlined,
  SearchOutlined,
  StarOutlined
}
  from '@ant-design/icons';
import { Route, Link, Switch } from 'react-router-dom'
const { Content, Header } = Layout;
const { TabPane } = Tabs;

function callback(params) {
  switch (params) {
    case '0':
      console.log("我的音乐页  home")
      break;
    case '1':
      console.log("发现页  find")
      break;
    case '2':
      console.log("直播页  live")
      break;
    case '3':
      console.log("探索页  search")
      break;
    case '4':
      console.log("手机Play页  mobile play")
      break;
    default:
      break;
  }
  console.log(params)
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
      loadingFlag: true,
      opacityVallue: 0
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

    // 设置透明度
    if (localStorage.opacityVallue && localStorage.opacityVallue !== "0") {
      this.changeOpacity(localStorage.opacityVallue * 1);
    }
  }
  changeOpacity = (value) => {
    document.body.style.background = `rgba(46,103,156, ${value})`;
    localStorage.opacityVallue = value
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
          {/* <Link to='/home'>Home</Link>
          <br />
          <Link to='/detail'>Detail</Link>
          <Switch>
            <Route path='/detail' component={Detail} />
            <Route path='/home' component={Home} />
          </Switch> */}
        </TabPane>
      )
    })

    return (
      <Skeleton active loading={this.state.loadingFlag} rows={20}>
        <Layout className="main-content">
          <Layout>
            <Header className="header webkit-no-drag" onDoubleClick={(e) => { this.changeSize(e, "max") }}>
              <CustomHeader defaultValue={localStorage.opacityVallue * 1} changeOpacity={(value) => { this.changeOpacity(value) }} />
            </Header>
            <Content style={{ padding: '15px 20px', minHeight: 500 }}>
              <Tabs defaultActiveKey="0" onChange={(params) => callback(params)}>
                {renderDom}
              </Tabs>
              <Button onClick={clickTab}>确定</Button>
            </Content>
          </Layout>
        </Layout>
      </Skeleton>
    )
  }
}
