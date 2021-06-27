import { Button, Row, Col, } from 'antd';
import React, { useState } from 'react';
import { ChinaMap } from '@/components/main/echarts/ChinaMap';
import store from 'src/redux';

function ChinaMapCom(props) {
    const myEchart = React.createRef();
    const [loading, setLoading] = useState(false);
    const [mapButtonTip, setMapButtonTip] = useState("COVID-19 Map");
    const loadMap = async () => {
        try {
            setLoading(true);
            console.log('myEchart.current', myEchart.current);
            if (myEchart.current) {
                await ChinaMap.initalECharts(myEchart.current, props.netValid);
                setMapButtonTip("Get again");
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
                    <div style={{width: "100%", height: "500px"}} ref={myEchart}>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={3}>
                    <Button type="primary" style={{ width: '120px' }} onClick={loadMap.bind(this)}
                        loading={loading} danger
                    >
                        {mapButtonTip}
                    </Button>
                </Col>
                <Col span={8}>
                    {store.getState().mapReducer.newTime !== "0000-00-00 00:00:00" ? "update time:" + store.getState().mapReducer.newTime : ""}
                </Col>
            </Row>
        </>
    )
}

export {
    ChinaMapCom
}