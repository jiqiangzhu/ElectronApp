import { Layout, Skeleton, List, Drawer } from 'antd';
import './App.less';
import { getMusicList } from './api';
import FooterCom from './components/footer';
import React from 'react';
import windowUtils from '@localUtils/window-util';
import { CustomHeader } from './components/header';
import store from '@redux';
import { currentIndexRedux, playMusicRedux, pauseMusicRedux } from '@redux/actions/play-actions';
import echarts from 'echarts';
import chinaJson from './static/china.json'
import { provienceData, geoCoordMap } from './static/geo.js';

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
      myChat: {}
    };
    this.scrollRef = React.createRef();
    this.myEchart = React.createRef();
  }
  initalECharts() {
    const data = [
      { name: '黑龙江', area: '东北大区', type: 'areaCenterCity', InValue: '0' },
      { name: '吉林', area: '东北大区', type: 'areaCenterCity', InValue: '0' },
      { name: '辽宁', area: '东北大区', type: 'areaCenterCity', InValue: '0' },
      { name: '内蒙古', area: '其他', type: 'areaCenterCity', InValue: '0' },
      { name: '北京', area: '华北大区', type: 'areaCenterCity', InValue: '0' },
      { name: '天津', area: '华北大区', type: 'areaCenterCity', InValue: '0' },
      { name: '河北', area: '华北大区', type: 'areaCenterCity', InValue: '0' },
      { name: '山东', area: '华北大区', type: 'areaCenterCity', InValue: '0' },
      { name: '山西', area: '华北大区', type: 'areaCenterCity', InValue: '0' },
      { name: '江苏', area: '华东大区', type: 'areaCenterCity', InValue: '0' },
      { name: '上海', area: '华东大区', type: 'areaCenterCity', InValue: '0' },
      { name: '浙江', area: '华东大区', type: 'areaCenterCity', InValue: '0' },
      { name: '福建', area: '华南大区', type: 'areaCenterCity', InValue: '0' },
      { name: '广东', area: '华南大区', type: 'areaCenterCity', InValue: '0' },
      { name: '海南', area: '华南大区', type: 'areaCenterCity', InValue: '0' },
      { name: '台湾', area: '其他', type: 'areaCenterCity', InValue: '0' },
      { name: '香港', area: '其他', type: 'areaCenterCity', InValue: '0' },
      { name: '澳门', area: '其他', type: 'areaCenterCity', InValue: '0' },
      { name: '河南', area: '华北大区', type: 'areaCenterCity', InValue: '0' },
      { name: '安徽', area: '华中大区', type: 'areaCenterCity', InValue: '0' },
      { name: '江西', area: '华中大区', type: 'areaCenterCity', InValue: '0' },
      { name: '广东', area: '华南大区', type: 'areaCenterCity', InValue: '0' },
      { name: '陕西', area: '华西大区', type: 'areaCenterCity', InValue: '0' },
      { name: '湖北', area: '华中大区', type: 'areaCenterCity', InValue: '0' },
      { name: '湖南', area: '华中大区', type: 'areaCenterCity', InValue: '0' },
      { name: '广西', area: '华南大区', type: 'areaCenterCity', InValue: '0' },
      { name: '宁夏', area: '华西大区', type: 'areaCenterCity', InValue: '0' },
      { name: '重庆', area: '华西大区', type: 'areaCenterCity', InValue: '0' },
      { name: '贵州', area: '华西大区', type: 'areaCenterCity', InValue: '0' },
      { name: '四川', area: '华西大区', type: 'areaCenterCity', InValue: '0' },
      { name: '云南', area: '华西大区', type: 'areaCenterCity', InValue: '0' },
      { name: '甘肃', area: '华西大区', type: 'areaCenterCity', InValue: '0' },
      { name: '青海', area: '其他', type: 'areaCenterCity', InValue: '0' },
      { name: '西藏', area: '其他', type: 'areaCenterCity', InValue: '0' },
      { name: '新疆', area: '其他', type: 'areaCenterCity', InValue: '0' }
    ];
    echarts.registerMap('china', chinaJson);
    for (const item of provienceData) {
      if (item.area === '东北大区') {
        item.itemStyle = {
          normal: {
            areaColor: '#3CA2FC',
          },
          emphasis: {
            areaColor: '#3CA2FC',
          }
        }
      } else if (item.area === '华北大区') {
        item.itemStyle = {
          normal: {
            areaColor: '#6CAFBE',
          },
          emphasis: {
            areaColor: '#6CAFBE',
          }
        }
      } else if (item.area === '华中大区') {
        item.itemStyle = {
          normal: {
            areaColor: '#ADD03C',
          },
          emphasis: {
            areaColor: '#ADD03C',
          }
        }
      } else if (item.area === '华东大区') {
        item.itemStyle = {
          normal: {
            areaColor: '#A13614',
          },
          emphasis: {
            areaColor: '#A13614',
          }
        }
      } else if (item.area === '华西大区') {
        item.itemStyle = {
          normal: {
            areaColor: '#FFBA00',
          },
          emphasis: {
            areaColor: '#FFBA00',
          }
        }
      } else if (item.area === '华南大区') {
        item.itemStyle = {
          normal: {
            areaColor: '#FFD300',
          },
          emphasis: {
            areaColor: '#FFD300',
          }
        }
      } else if (item.area === '南海诸岛') {
        item.itemStyle = {
          normal: {
            borderColor: '#fff', // 区域边框颜色
            areaColor: '#fff', // 区域颜色
          },
          emphasis: {
            show: false,
            // borderColor: '#fff',
            // areaColor:"#fff",
          }
        }
      } else {
        item.itemStyle = {
          normal: {
            areaColor: '#D9D9D9',
          },
          emphasis: {
            areaColor: '#D9D9D9',
          }
        }
      }
    }
    const myChart = echarts.init(this.myEchart.current)
    myChart.setOption({
      tooltip: {
        show: false, // 不显示提示标签
        // formatter: '{b}', // 提示标签格式
        //鼠标放地图的某一块，显示的提示框
        formatter(params, ticket, callback) {
          console.log(params)
          return `'批复投资额（亿元）'<br />${params.name}：${params.data.InValue}`
        },
        backgroundColor: '#ff7f50', // 提示标签背景颜色
        textStyle: { color: '#fff' } // 提示标签字体颜色
      },
      grid: {
        left: '10%',
        right: '10%',
        top: '10%',
        bottom: '10%',
        containLabel: true
      },
      geo: {
        map: 'china',
        roam: false,
        zoom: 1.2,
        tooltip: {
          show: false, // 不显示提示标签
        },
        label: {
          normal: {
            show: false, // 显示省份标签
            textStyle: { color: '#c71585' }// 省份标签字体颜色
          },
          emphasis: {// 对应的鼠标悬浮效果
            show: false,
            textStyle: { color: '#800080' }
          }
        },
        itemStyle: {
          normal: {
            borderWidth: 0.5, // 区域边框宽度
            borderColor: '#000', // 区域边框颜色
            areaColor: '#ffefd5', // 区域颜色
            label: { show: false }
          },
          emphasis: {
            show: false,
            borderWidth: 0.5,
            borderColor: '#4b0082',
            areaColor: '#ffdead',
          }
        },
      },
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          data: this.convertData(data),
          symbolSize: 1,
          symbolRotate: 40,
          label: {
            normal: {
              formatter: '{b}',
              position: 'top',
              show: true
            },
            emphasis: {
              show: false
            }
          },
          tooltip: {
            show: false, // 不显示提示标签
            formatter(name) {// 显示提示的标签
              return `Legend ${name}`;
            }, // 提示标签格式
            backgroundColor: '#000', // 提示标签背景颜色
            borderColor: '#ccc',
            borderWidth: 5,
            textStyle: { color: '#FFF' } // 提示标签字体颜色
          },
          itemStyle: {
            normal: {
              color: 'black'
            }
          }
        },
        {
          type: 'map',
          mapType: 'china',
          roam: false,
          zoom: 1.2,
          tooltip: {
            show: false, // 不显示提示标签
          },
          label: {
            normal: {
              show: false // 显示省份标签
            },
            emphasis: {
              show: false,
            }
          },
          itemStyle: {
            normal: {
              borderWidth: 0.5, // 区域边框宽度
              borderColor: '#fff', // 区域边框颜色
              label: { show: false }
            },
            emphasis: {
              show: false,
            }
          },
          // geoIndex: 0,
          //鼠标放入地图显示提示框
          // tooltip: { show: true },
          data: provienceData
        }
      ],
    })

    myChart.on('click', params => {
      if (params.name === '海南') {
        this.props.history.push('/Dashboard/map2')
      }
    });
  }

  convertData(data) {
    const res = [];
    for (let i in data.length) {
      const geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].area),
          area: data[i].area,
          type: data[i].type,
          InValue: data[i].InValue
        });
      }
    }
    return res;
  }

  convert() {
    return '1';
  }
  async checkInternetAvailable() {
    internetAvailable({
      domainName: "baidu.com"
    }).then(() => {
      console.log("Internet available");
    }).catch(() => {
      console.log("No internet");
    });
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
  componentDidUpdate() {
    if (this.myEchart.current) {
      this.initalECharts()
    }
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
      console.error(e);;
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
            <div style={{ width: '800px', height: '500px' }} ref={this.myEchart}>
            </div>
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
