import echarts from 'echarts';
import chinaJson from '@/static/china.json'
import { getFYDataFromSina } from '@/api';
import fsUtils from '@/utils/fs-util';

const ChinaMap = {
    initalECharts: (EchartDom, netValid) => {
        let result = false;
        try {
            const chinaJsonData = chinaJson;
            result = ChinaMap.fetchData(netValid, EchartDom, chinaJsonData);
            return result;
        } catch (err) {
            console.error('initalECharts err', err);
            return false;
        }
    },
    addEventLS: (myChart) => {
        console.log('add event listener');
        myChart.on('click', function (obj) {
            console.log('obj.data.name------', obj.data.name);
            console.log('obj.data.city------', obj.data.city);
            // myChart.setOption({})
        })
    },
    getOptionConfig: (dataList) => {
        return
    },

    fetchData: async (netValid, EchartDom, chinaJsonData) => {
        try {
            echarts.registerMap('china', chinaJsonData);
            const myChart = echarts.init(EchartDom, 'dark');
            console.log('myChart', myChart);
            let fydata, isFileExist, option;
            try {
                await fsUtils.fileStat('src/static/fydata.json');
                isFileExist = true;
            } catch (err) {
                isFileExist = false;
            }
            console.log('netValid', netValid);
            // (toady or net avaliable) and file exist, load local file
            if (isFileExist && (localStorage.lastFetchFyDate === new Date().toDateString() || !netValid)) {
                fydata = await getFYDataFromSina(false);
                // file not exist, request sina data and save local
            } else {
                if (!netValid) {
                    return 'net cannot connect'
                }
                fydata = await getFYDataFromSina(netValid);
                localStorage.lastFetchFyDate = new Date().toDateString();
                if (fydata) {
                    fsUtils.writeFile('src/static/fydata.json', JSON.stringify(fydata));
                }
            }
            console.log('fydata', fydata);
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
                tooltip: {
                    trigger: 'item',
                    formatter: function (datas) {
                        if (datas.name === "北京") {
                            console.log('datas-------------------', datas);
                        }
                        let res = datas.name + '<br/>'
                        res += "累计确诊人数：" + datas.value;
                        return res;
                    }
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
                    },
                    show: false
                },
                // set map data
                series: [
                    {
                        data: dataList,
                        type: 'map',
                        mapType: 'china',
                        roam: true,
                        itemStyle: {
                            normal: {
                                borderWidth: 0.5
                            },
                            emphasis: {
                                borderWidth: 1
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
            ChinaMap.addEventLS(myChart);
            return true;
        } catch (err) {
            console.error('err in fetch data', err);
            return false;
        }
    }
}

export {
    ChinaMap
}