import { Layout, Tabs, Skeleton } from 'antd';
import './App.less';
import { getMusicList } from './api';
import React from 'react';
import { CustomHeader } from './components/header';
import { LiveCom, DiscoveryCom, Home, MobilePlayCom, ExploreCom, LocalDownloadCom } from './components/main';
import {
  UserOutlined,
  SearchOutlined,
  StarOutlined
}
  from '@ant-design/icons';
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
      opacityVallue: 0,
      rightContent: ""
    };
  }

  async componentDidMount() {
    setTimeout(async () => {
      this.setState({
        loadingFlag: false
      })
      let result = await getMusicList();
      console.log("获取播放列表---------------", result);
    }, 200)

    // 设置透明度
    if (localStorage.opacityVallue && localStorage.opacityVallue !== "0") {
      this.changeOpacity(localStorage.opacityVallue * 1);
    }
    this.chooseItem(2)
  }

  changeOpacity = (value) => {
    console.log("value----------",value)
    document.body.style.background = `rgba(46,103,156, ${value})`;
    localStorage.opacityVallue = value;
  }
  chooseItem = (index) => {
    console.log(index)
    switch (index) {
      case 0:
        this.setState({
          rightContent: "我的收藏"
        })
        break;
      case 1:
        this.setState({
          rightContent: "我的电台"
        })
        break;
      case 2:
        this.setState({
          rightContent: <LocalDownloadCom />
        })
        break;
      case 3:
        this.setState({
          rightContent: "音乐云盘"
        })
        break;
      case 4:
        this.setState({
          rightContent: "最近播放"
        })
        break;
      case 5:
        this.setState({
          rightContent: "默认列表"
        })
        break;
      default:
        this.setState({
          rightContent: "本地与下载"
        })
        break;
    }
  }
  render() {
    let renderDom = this.state.tabs.map((item, index) => {
      let nodeItem,
        rendertab;
      switch (index) {
        case 0:
          nodeItem = <UserOutlined />
          rendertab = <div className="flex-type">
            <Home onClick={(e, index) => this.chooseItem(index)} />
            {this.state.rightContent}
          </div>

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