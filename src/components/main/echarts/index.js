import { Button, Row, Col, message, List, Divider, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { ChinaMap } from '@/components/main/echarts/ChinaMap';
import store from 'src/redux';
import { setMapDomRedux } from '@redux/actions/map-actions';

/**
 * China COVID-19 map use echarts
 * @param {*} props 
 * @returns 
 */
const { Content } = Layout;
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
];
function ChinaMapCom(props) {
    const myEchart = React.createRef();
    const [loading] = useState(false);
    const [mapButtonTip, setMapButtonTip] = useState("Get Again");
    const [disBtnFlag, setDisBtnFlag] = useState(false);
    useEffect(() => {
        // loadMap("init")
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    const loadMap = async (flag) => {
        try {
            store.dispatch(setMapDomRedux(myEchart.current))
            const loadingFn = message.loading("loading Covid-19 map", 0);
            setDisBtnFlag(true);
            setMapButtonTip(`loading...`);
            console.log('mapReducer', store.getState().mapReducer);
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
        }
    }
    return (
        <>

            <Row style={{ overflow: 'hidden' }}>
                <Col span={24} style={{ display: 'flex' }}>
                    <div style={{ width: "60%", height: "500px" }} ref={myEchart}>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', height: "535px" }}>
                        <Divider orientation="left" style={{color: '#ff0000', fontSize: '20px'}}>Details in {store.getState().mapReducer.name}</Divider>
                        <div className="my-content" >
                            <Content>
                                <List
                                    size="large"
                                    bordered={false}
                                    dataSource={data}
                                    renderItem={item => <List.Item>{item}</List.Item>}
                                />
                            </Content>
                        </div>

                    </div>
                </Col>
            </Row>
            <div style={{ position: 'fixed', bottom: '80px', left: '20px' }}>
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
                    <Col span={8}>
                        {store.getState().mapReducer.newTime !== "0000-00-00 00:00:00" ? "update time: " + store.getState().mapReducer.newTime : ""}
                    </Col>
                </Row>
            </div>

        </>
    )
}

export {
    ChinaMapCom
}