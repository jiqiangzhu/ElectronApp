import { Layout, Skeleton, List } from 'antd';
import './App.less';
import { getMusicList } from './api';
import FooterCom from './components/footer'
import React from 'react';
import windowUtils from '@localUtils/windowUtils.js';
import { CustomHeader } from './components/header';

const { Content, Header, Footer } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingFlag: false,
      opacityVallue: 0,
      musicList: [],
      musicDom: ""
    };
  }

  async UNSAFE_componentWillMount() {
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

  }

  changeOpacity = (value) => {
    console.log("opacity value---78~100-------", value*100);
    windowUtils.setWindowOpacity(value);
    localStorage.opacityVallue = value;
  }

  playMusic = (index) => {
    console.log("music index------------", index)
  }

  setMusicList = (musicList) => {
    console.log("musicList-----", musicList);
    this.setState({
      musicList: musicList,
      musicDom: musicList.map((item, index) => {
        return (
          <p key={index}>{item}</p>
        )
      })
    })
  }
  render() {
    return (
      <Skeleton active loading={this.state.loadingFlag} rows={100}>
        <Layout className="main-content">
          <Header className="lay-header webkit-drag" style={{ position: 'fixed', zIndex: 10, width: '100%' }}>
            <CustomHeader defaultValue={localStorage.opacityVallue * 1} 
                          changeOpacity={(value) => { this.changeOpacity(value) }} 
            />
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
            
            </Content>
          </Layout>
          {/* 后续删除Footer height */}
          <Footer style={{ height: "40px", lineHeight: '40px', position: 'fixed', zIndex: 10, bottom: 0, width: '100%' }}>
            <FooterCom playMusic={(i) => this.playMusic(i)} 
                       getMusicListFromFooterCom={(musicList) => this.setMusicList(musicList)} 
                       
            />
          </Footer>
        </Layout>
      </Skeleton>
    )
  }
}
