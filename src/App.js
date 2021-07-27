import { Skeleton } from 'antd';
import './App.less';
import { getMusicList } from './api';
import React from 'react';
import routes from './router';
import windowUtils from '@localUtils/window-util';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingFlag: true,
      opacityVallue: 0
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
    }, 100)

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
  render() {
    return (
      <Skeleton active loading={this.state.loadingFlag} rows={100} >
        <div className="main-content">
          {routes}
        </div>
      </Skeleton >
    )
  }
}
