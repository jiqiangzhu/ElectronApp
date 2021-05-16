import { Layout, Skeleton, List } from 'antd';
import './App.less';
import { getMusicList } from './api';
import FooterCom from './components/footer'
import React from 'react';
import windowUtils from '@localUtils/windowUtils.js';
import { CustomHeader } from './components/header';
import {
  LocalDownloadCom, DefaultListCom, MusicPanCom, Home,
  MyCollectionCom, MyTVCom, RecentlyPlayCom, ExploreCom
} from './components/main';
// import { createFromIconfontCN } from '@ant-design/icons';

// const IconFont = createFromIconfontCN();
const { Content, Header, Footer } = Layout;

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
      rightContent: "",
      renderContent: "",
      musicList: [],
      musicDom: ""
    };
  }

  async componentWillMount() {
    // 骨架屏
    setTimeout(async () => {
      this.setState({
        loadingFlag: false
      })
      let result = await getMusicList();
      console.log("获取播放列表---------------", result);
    }, 1000)

    // 设置透明度
    if (localStorage.opacityVallue && localStorage.opacityVallue !== "0") {
      this.changeOpacity(localStorage.opacityVallue * 1);
    }
    this.callback(0);
    this.chooseItem(2);
  }

  changeOpacity = (value) => {
    console.log("opacity value---0~1-------", value);
    windowUtils.setWindowOpacity(value);
    localStorage.opacityVallue = value;
  }
  chooseItem = (index) => {
    console.log(index)
    switch (index) {
      case 0:
        this.setState({
          rightContent: <MyCollectionCom />
        })
        break;
      case 1:
        this.setState({
          rightContent: <MyTVCom />
        })
        break;
      case 2:
        this.setState({
          rightContent: <LocalDownloadCom />
        })
        break;
      case 3:
        this.setState({
          rightContent: <MusicPanCom />
        })
        break;
      case 4:
        this.setState({
          rightContent: <RecentlyPlayCom />
        })
        break;
      case 5:
        this.setState({
          rightContent: <DefaultListCom />
        })
        break;
      default:
        this.setState({
          rightContent: <LocalDownloadCom />
        })
        break;
    }
  }
  playMusic = (index) => {
    console.log("music index------------", index)
  }
  callback = (params) => {
    switch (params) {
      case 0:
        this.setState({
          renderContent: <div className="flex-type full">
            <Home onClick={(e, index) => this.chooseItem(index)} />
            {this.state.rightContent}
          </div>
        })
        break;
      case 1:
        this.setState({
          renderContent: <div className="flex-type full">
            <ExploreCom onClick={(e, index) => this.chooseItem(index)} />
            {this.state.rightContent}
          </div>
        })
        break
      default:

        break;
    }
  }
  setMusicList = (musicList) => {
    console.log("musicList-----", musicList);
    this.setState({
      musicDom: musicList.map((item, index) => {
        return (
          <p key={index}>{item}</p>
        )
      })
    })

  }
  render() {
    // let renderDom = this.state.tabs.map((item, index) => {
    //   let nodeItem;
    //   // rendertab;
    //   switch (index) {
    //     case 0:
    //       nodeItem = <UserOutlined />
    //       // rendertab = <div className="flex-type full">
    //       //   <Home onClick={(e, index) => this.chooseItem(index)} />
    //       //   {this.state.rightContent}
    //       // </div>

    //       break;
    //     case 1:
    //       nodeItem = <SearchOutlined />
    //       // rendertab = <DiscoveryCom />
    //       break;
    //     case 2:
    //       nodeItem = <StarOutlined />
    //       // rendertab = <LiveCom />
    //       break;
    //     case 3:
    //       nodeItem = ''
    //       // rendertab = <ExploreCom />
    //       break;
    //     case 4:
    //       nodeItem = ''
    //       // rendertab = <MobilePlayCom />
    //       break;
    //     default:
    //       nodeItem = <UserOutlined />
    //       // rendertab = <Home />
    //       break;
    //   }
    //   return (
    //     <TabPane tab={
    //       <span>
    //         {nodeItem}
    //         {item}
    //       </span>
    //     } key={index} onClick={clickTab}>
    //       {/* {rendertab} */}

    //     </TabPane>
    //   )
    // })

    return (
      <Skeleton active loading={this.state.loadingFlag} rows={40}>
        <Layout className="main-content">
          <Header className="lay-header webkit-drag" style={{ position: 'fixed', zIndex: 10, width: '100%' }}>
            <CustomHeader defaultValue={localStorage.opacityVallue * 1} changeOpacity={(value) => { this.changeOpacity(value) }} />
          </Header>
          <Layout className="my-content">
            <Content>
                <List
                  
                  dataSource={this.state.musicDom}
                  renderItem={item => (
                    <List.Item>
                      {item}
                    </List.Item>
                  )}
                />
              {/* <Layout>
                <Sider className="site-layout-background" width={200} style={{
                  overflow: 'auto',
                  height: '100vh',
                  position: 'fixed',
                  left: 0,
                }}>
                  {this.state.renderContent}
                </Sider>
                <Content style={{ padding: '0 24px 0 200px', minHeight: 280 }}>
                  <Layout>
                    {this.state.rightContent}
                  </Layout>
                </Content>
              </Layout> */}
              {/* <IconFont onClick={()=>console.log("OK")} style={{ fontSize: '16px', position: 'absolute', bottom: '20px', right:'20px' }} className="webkit-no-drag" type='icon-cuowuguanbiquxiao-yuankuang' /> */}
            </Content>
          </Layout>
          {/* 后续删除Footer height */}
          <Footer style={{ height: "40px", lineHeight: '40px', position: 'fixed', zIndex: 10, bottom: 0, width: '100%' }}>
            <FooterCom playMusic={(i) => this.playMusic(i)} getMusicListFromFooterCom={(musicList) => this.setMusicList(musicList)} />
          </Footer>
        </Layout>
      </Skeleton>
    )
  }
}


// function clickTab(e) {
//   console.log("e", e);
// }