import { Layout, Skeleton } from 'antd';
import './App.less';
import { getMusicList } from './api';
import FooterCom from './components/footer';
import React from 'react';
import windowUtils from '@localUtils/window-util';
import { CustomHeader } from './components/header';
import store from '@redux';
import { currentIndexRedux, playMusicRedux } from '@redux/actions/play-actions';
import { ChinaMapCom } from '@/components/main/echarts';
import MusicListPopup from '@/components/main/popup';
import routes from './router';
const { Header, Footer } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingFlag: true,
      opacityVallue: 0,
      musicList: [],
      musicDom: "",
      visible: false,
      netValid: false
    };
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
    console.log('this', this);
    this.setState({
      netValid: await windowUtils.checkInternetAvailable()
    })
  }
  changeOpacity = (value) => {
    console.log("opacity value---78~100-------", value * 100);
    windowUtils.setWindowOpacity(value);
    localStorage.opacityVallue = value;
  }

  playMusic = (index) => {
    const reducer = store.getState().playReducer;
    try {
      if (reducer.playFlag === "play") {
        reducer.currentAudio.pause();
      }
      store.dispatch(playMusicRedux("play"));
      if (reducer.currentAudio && reducer.currentAudio.paused) {
        if (index !== reducer.currentIndex) {
          store.dispatch(currentIndexRedux(index, reducer.currentAudio));
        }
        reducer.currentAudio.play();
      }
    } catch (e) {
      store.dispatch(playMusicRedux("pause"));
      console.error(e);
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
      <Skeleton active loading={this.state.loadingFlag} rows={100} >
        <Layout className="main-content">
          <Header className="lay-header webkit-drag" style={{ position: 'fixed', zIndex: 10, width: '100%' }}>
            <CustomHeader defaultValue={localStorage.opacityVallue * 1}
              changeOpacity={(value) => { this.changeOpacity(value) }}
            />
          </Header>
          <Layout>
            <>
              {routes}
            </>
            <ChinaMapCom netValid={this.state.netValid} />
          </Layout>

          {/* Drawer-Music List */}
          <Layout>
            <MusicListPopup musicDom={this.state.musicDom} visible={this.state.visible} onClose={() => this.onClose()} />
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
      </Skeleton >
    )
  }
}
