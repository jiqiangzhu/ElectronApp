import { Button } from 'antd';
import React, { useState } from 'react';
import { ChinaMap } from '@/components/main/echarts';
import windowUtils from '@localUtils/window-util';

function ChinaMapCom() {
    const myEchart = React.createRef();
    const [loading, setLoading] = useState(false);
    const [mapButtonTip, setMapButtonTip] = useState("COVID-19 Map");
    const loadMap = async () => {
        try {
            setLoading(true);
            console.log('myEchart.current', myEchart.current);
            let netValid = windowUtils.checkInternetAvailable();
            if (myEchart.current) {
                await ChinaMap.initalECharts(myEchart.current, netValid);
                setMapButtonTip("Get again");
                setLoading(false);
            }
        } catch (e) {
            console.error('loading map data err', e);
        }
    }

    return (
        <>
            <div style={{ width: '800px', height: '500px' }} ref={myEchart}>
            </div>
            <Button type="primary" style={{ width: '120px' }} onClick={loadMap.bind(this)}
                loading={loading} danger
            >
                {mapButtonTip}
            </Button>
        </>
    )
}

export {
    ChinaMapCom
}