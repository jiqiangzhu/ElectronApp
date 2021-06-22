import echarts from 'echarts';
import chinaJson from '@/static/china.json'
import { getFYDataFromSina } from '@/api';
import fsUtils from '@/utils/fs-util'

const ChinaMap = {
    initalECharts: async (EchartDom) => {
        let result;
        echarts.registerMap('china', chinaJson);

        const myChart = echarts.init(EchartDom, 'dark');
        let fydata, option;
        fsUtils.fileStat('fydata.json', async (e, stats) => {
            console.log('isFile', stats.isFile());

            fydata = await getFYDataFromSina();
            let dataList = fydata.data.data.list;
            let addDaily = fydata.data.data.add_daily;
            console.log('addDaily>>>>>>>>>>>', addDaily);
            option = {
                backgroundColor: 'transparent',
                title: {
                    text: 'COVID-19 map in china',
                    x: 'center',
                    textStyle: {
                        color: '#efefef'
                    }
                },
                // 放上鼠标后显示的新
                tooltip: {
                    trigger: 'item'
                },
                toolbox: {
                    show: true,
                    left: 'center',
                    bottom: '30',
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: true, title: 'Data View' },
                        restore: { show: true, title: 'Restore' },
                        saveAsImage: { show: true, backgroundColor: '#3B3B4D', title: 'Save as Image' }
                    }
                },
                visualMap: {
                    min: 1,
                    max: 3000,
                    left: '30',
                    top: '30',
                    text: ['max', 'min'],
                    calculable: false,
                    textStyle: {
                        color: '#efefef',
                        fontSize: 15
                    }
                },
                // 设置地图数据
                series: [
                    {
                        data: dataList,
                        type: 'map',
                        mapType: 'china',
                        roam: false
                    }
                ]
            };

            myChart.setOption(option);

            result = true;
        })
        return result;
    }
}

export {
    ChinaMap
}