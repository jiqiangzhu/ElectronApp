import { Layout, Skeleton, List, Drawer } from 'antd';
import './App.less';
import { getMusicList } from './api';
import FooterCom from './components/footer';
import React from 'react';
import windowUtils from '@localUtils/window-util';
import { CustomHeader } from './components/header';
import store from '@redux';
import { currentIndexRedux, playMusicRedux, pauseMusicRedux } from '@redux/actions/play-actions';

const { Content, Header, Footer } = Layout;

// store.subscribe();
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingFlag: true,
      opacityVallue: 0,
      musicList: [],
      musicDom: "",
      visible: false
    };
    this.scrollRef = React.createRef();
  }

  async UNSAFE_componentWillMount() {
    // Skeleton
    setTimeout(async () => {
      this.setState({
        loadingFlag: false
      })
      let result = await getMusicList();
      console.log("get playlist---------------", result);
    }, 1000)

    // set Opacity
    if (localStorage.opacityVallue && localStorage.opacityVallue !== "0") {
      this.changeOpacity(localStorage.opacityVallue * 1);
    }
  }

  changeOpacity = (value) => {
    console.log("opacity value---78~100-------", value * 100);
    windowUtils.setWindowOpacity(value);
    localStorage.opacityVallue = value;
  }

  playMusic = (index) => {
    const reducer = store.getState().playReducer;
    if (reducer.playFlag === "play") {
      reducer.currentAudio.pause();
    }
    store.dispatch(playMusicRedux("play"));
    store.dispatch(currentIndexRedux(index, reducer.currentAudio));
    if (reducer.currentAudio && reducer.currentAudio.paused) {
      try {
        reducer.currentAudio.play();
      } catch (e) {
        store.dispatch(pauseMusicRedux("pause"));
        console.error(e);;
      }
    }
    this.setMusicDom()
  }

  setMusicList = (musicList) => {
    this.setState({
      musicList: musicList
    })
    this.setMusicDom();
  }
  setMusicDom = () => {
    this.setState({
      musicDom: this.state.musicList.map((item, index) => {
        return (
          <p onDoubleClick={() => this.playMusic(index)} key={index}
            className={index === store.getState().playReducer.currentIndex ? "music-active" : ""}>
            {(item.indexOf('.mp3') !== -1) ? item.substr(0, item.indexOf('.mp3')) : item}
          </p>
        )
      })
    })
  }
  openMusicList = () => {
    console.log('open music list...');
    this.setState({
      visible: true
    })
  }

  onClose = () => {
    this.setState({
      visible: false
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
          <Layout>

          </Layout>

          {/* Drawer-Music List */}
          <Layout>
            <Drawer
              title="Music List"
              placement="right"
              closable={false}
              onClose={() => this.onClose()}
              visible={this.state.visible}
              maskStyle={{ background: 'transparent' }}
              headerStyle={{ color: '#FFFFFF' }}
              className="webkit-no-drag cannotselect"
            >
              <div ref={this.scrollRef} className="my-content">
                <Content>
                  <List
                    dataSource={this.state.musicDom}
                    renderItem={(item, index) => (
                      <List.Item className={index === store.getState().playReducer.currentIndex ? "list-item" : ""}>
                        {item}
                      </List.Item>
                    )}
                  />

                </Content>
              </div>
            </Drawer>
          </Layout>

          <Footer style={{
            height: "40px", lineHeight: '40px',
            position: 'fixed', zIndex: 10,
            bottom: 0, width: '100%'
          }}
          >
            <FooterCom playMusic={(i) => this.playMusic(i)}
              getMusicListFromFooterCom={(musicList) => this.setMusicList(musicList)}
              openMusicList={() => this.openMusicList()}
              setMusicDom={() => this.setMusicDom()}
            />
          </Footer>
        </Layout>
      </Skeleton>
    )
  }
}
