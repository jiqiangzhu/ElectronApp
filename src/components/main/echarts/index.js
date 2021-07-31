import { Button, Row, Col, message, List, Divider, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { ChinaMap } from '@/components/main/echarts/ChinaMap';
import store from 'src/redux';
import { setMapDomRedux } from '@redux/actions/map-actions';
import './index.less';

/**
 * China COVID-19 map use echarts
 * @param {*} props 
 * @returns 
 */
const { Content } = Layout;

function ChinaMapCom(props) {
    const myEchart = React.createRef();
    const [loading] = useState(false);
    const [mapButtonTip, setMapButtonTip] = useState("Get Again");
    const [disBtnFlag, setDisBtnFlag] = useState(false);
    useEffect(() => {
        loadMap();
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    const loadMap = async (flag) => {
        const loadingFn = message.loading("loading Covid-19 map", 0);
        setMapButtonTip(`loading...`);
        try {
            store.dispatch(setMapDomRedux(myEchart.current))
            setDisBtnFlag(true);
            let isSuccess = await ChinaMap.initalECharts();
            if (!isSuccess) {
                message.error({
                    content: "err, try again",
                    style: {
                        marginTop: '40vh',
                    },
                });
                loadingFn();//close message box
                setDisBtnFlag(false);
                setMapButtonTip(`Get Again`)
                return
            }
            let i = 60;
            let interval1 = setInterval(() => {
                i--;
                if (i === 0) {
                    setDisBtnFlag(false);
                    setMapButtonTip(`Get Again`);
                    clearInterval(interval1)
                    return;
                }
                setMapButtonTip(`${i} S`)
            }, 1000);
            message.success('complete')
            loadingFn(); //close message box
        } catch (e) {
            console.error('loading map data err', e);
            loadingFn(); //close message box
        }
    }
    return (
        <div className="home-content">
            <div className="content">
                <div style={{ width: "60%", height: "500px" }} ref={myEchart}>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', height: "535px" }}>
                    <Divider orientation="left" style={{ color: '#ff0000', fontSize: '20px', display: store.getState().mapReducer.name ? "block" : "none" }}>Detailed data in {store.getState().mapReducer.name}</Divider>
                    <div className="scroll-bar" style={{padding: "0"}} >
                        <Content>
                            <List
                                size="large"
                                bordered={false}
                                dataSource={store.getState().mapReducer.data ? JSON.parse(store.getState().mapReducer.data) : []}
                                renderItem={item => <List.Item>{item}</List.Item>}
                            />
                        </Content>
                    </div>
                </div>
            </div>
            <Row>
                <Col span={6}>
                    <Button type="primary" onClick={loadMap.bind(this)}
                        loading={loading} danger disabled={disBtnFlag}
                    >
                        {mapButtonTip}
                    </Button>
                    <Button type="primary" onClick={() => props.history.push('/')}>
                        Back
                    </Button>
                </Col>
                <Col span={8} className="cannotselect">
                    {store.getState().mapReducer.newTime !== "0000-00-00 00:00:00" ? "update time: " + store.getState().mapReducer.newTime : ""}
                </Col>
            </Row>

        </div>
    )
}

export {
    ChinaMapCom
}