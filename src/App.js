import { Layout, Skeleton, List, Drawer, Button } from 'antd';
import './App.less';
import { getMusicList } from './api';
import FooterCom from './components/footer';
import React from 'react';
import windowUtils from '@localUtils/window-util';
import { CustomHeader } from './components/header';
import store from '@redux';
import { currentIndexRedux, playMusicRedux, pauseMusicRedux } from '@redux/actions/play-actions';
import { ChinaMap } from '@/components/main/echarts'

const { Content, Header, Footer } = Layout;
const internetAvailable = window.require("internet-available");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingFlag: true,
      opacityVallue: 0,
      musicList: [],
      musicDom: "",
      visible: false,
      loading: false,
      forbiddenFlag: false,
      mapButtonTip: 'COVID-19 Map',
      netValid: false
    };
    this.scrollRef = React.createRef();
    this.myEchart = React.createRef();
  }

  async checkInternetAvailable() {
    try {
      await internetAvailable({ domainName: "baidu.com" });
      this.setState({
        netValid: true
      })
      console.log('net avaliable--------');
    } catch (err) {
      this.setState({
        netValid: false
      })
      console.warn('net cannot connect------', err);
    }
  }

  async UNSAFE_componentWillMount() {
    this.checkInternetAvailable();

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
  componentDidMount() {
    console.log('this', this);
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
      store.dispatch(pauseMusicRedux("pause"));
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

  loadMap = async () => {
    try {
      this.setState({
        loading: true
      })
      this.checkInternetAvailable();
      if (this.myEchart.current) {
        await ChinaMap.initalECharts(this.myEchart.current, this.state.netValid);
        this.setState({
          loading: false,
          mapButtonTip: "Get again"
        })
      }
    } catch (e) {
      console.err('loading map data err', e);
    }
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
            <div style={{ width: '800px', height: '500px' }} ref={this.myEchart}>
            </div>
            {/* <Button style={{ width: '120px', height: '25px' }} onClick={this.loadMap}>加载疫情地图</Button> */}
            <Button type="primary" style={{ width: '120px' }} onClick={this.loadMap}
              loading={this.state.loading} danger disabled={this.state.forbiddenFlag}
            >
              {this.state.mapButtonTip}
            </Button>
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
      </Skeleton >
    )
  }
}
