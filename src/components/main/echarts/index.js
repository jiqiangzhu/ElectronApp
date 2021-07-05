import { Button, Row, Col, } from 'antd';
import React, { useEffect, useState } from 'react';
import { ChinaMap } from '@/components/main/echarts/ChinaMap';
import store from 'src/redux';

/**
 * China COVID-19 map use echarts
 * @param {*} props 
 * @returns 
 */
function ChinaMapCom(props) {
    const myEchart = React.createRef();
    const [loading, setLoading] = useState(false);
    const [mapButtonTip, setMapButtonTip] = useState("Get Again");
    const [disBtnFlag, setDisBtnFlag] = useState(false);
    useEffect(() => {
        loadMap("init")
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    const loadMap = async (flag) => {
        try {
            if (flag === "init") {
                await ChinaMap.initalECharts(myEchart.current, props.netValid);
                return;
            }
            setLoading(true);
            setMapButtonTip(`60 S`)
            setDisBtnFlag(true);
            console.log('myEchart.current', myEchart.current);
            if (myEchart.current) {
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
                setLoading(false);
            }
        } catch (e) {
            console.error('loading map data err', e);
        }
    }
    return (
        <>

            <Row>
                <Col span={24}>
                    <div style={{ width: "60%", height: "500px" }} ref={myEchart}>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Button type="primary" onClick={loadMap.bind(this)}
                        loading={loading} danger disabled={disBtnFlag}
                    >
                        {mapButtonTip}
                    </Button>
                    <Button type="primary" onClick={() => props.history.push('/')}>
                        返回
                    </Button>
                </Col>
                <Col span={8}>
                    {store.getState().mapReducer.newTime !== "0000-00-00 00:00:00" ? "update time: " + store.getState().mapReducer.newTime : ""}
                </Col>
            </Row>
        </>
    )
}

export {
    ChinaMapCom
}