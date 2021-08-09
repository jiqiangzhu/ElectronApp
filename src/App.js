import { Skeleton } from 'antd';
import './App.less';
import Api from './api';
import React, { useEffect, useState } from 'react';
import routes from './router';
import LoadingCom from './components/main/loading';
import { connect } from 'react-redux';

function AppCom(props) {
  let [loadingFlag, setLoadingFlag] = useState(true);
  const [RenderCom, setRenderCom] = useState("");
  const { showLoading } = props;

  useEffect(() => {
    setTimeout(async () => {
      setLoadingFlag(false)
    }, 500)

    async function initRequset() {
      let result = await Api.get('/home/musiclist');
      console.log("get playlist---------------", result);
    }
    initRequset()
  }, [])

  useEffect(() => {
    setRenderCom(showLoading ? <LoadingCom show={true} /> : "")
  }, [showLoading])
  
  return (
    <Skeleton active loading={loadingFlag} rows={100} >
      <div className="main-content">
        {routes}
      </div>
      {RenderCom}
    </Skeleton >
  )
}
const mapStateToProps = (state) => {
  return {
    showLoading: state.playReducer.showLoading
  }
}

const App = connect(mapStateToProps)(AppCom)

export default App;