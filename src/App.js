import { Layout, Skeleton, List } from 'antd';
import './App.less';
import { getMusicList } from './api';
import FooterCom from './components/footer';
import React from 'react';
import windowUtils from '@localUtils/window-util';
import { CustomHeader } from './components/header';

const { Content, Header, Footer } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingFlag: true,
      opacityVallue: 0,
      musicList: [],
      musicDom: ""
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
    console.log("music index------------", index)
  }

  setMusicList = (musicList) => {
    this.setState({
      musicList: musicList,
      musicDom: musicList.map((item, index) => {
        return (
          <p onClick={() => this.playMusic(index)} key={index}>
            {(item.indexOf('.mp3') !== -1) ? item.substr(0, item.indexOf('.mp3')) : item}
          </p>
        )
      })
    })
  }
  myMouseEvent = (flag) => {
    // if (flag === 1) {
    //   this.scrollRef.current.classList.remove('my-content1')
    //   this.scrollRef.current.classList.add('my-content')
    // } else {
    //   this.scrollRef.current.classList.remove('my-content')
    //   this.scrollRef.current.classList.add('my-content1')
    // }
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
            <div ref={this.scrollRef}
              className="my-content"
              // onMouseMove={() => this.myMouseEvent(1)}
              // onMouseLeave={() => this.myMouseEvent(2)}
            >
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
            </div>
          </Layout>

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
