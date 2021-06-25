import echarts from 'echarts';
import chinaJson from '@/static/china.json'
import { getFYDataFromSina } from '@/api';
import fsUtils from '@/utils/fs-util';

const ChinaMap = {
    initalECharts: (EchartDom, netValid) => {
        let result = false;
        try {
            const chinaJsonData = chinaJson;
            result = ChinaMap.fetchData(netValid, EchartDom, chinaJsonData, "country");
            return result;
        } catch (err) {
            console.error('initalECharts err', err);
            return false;
        }
    },
    addEventLS: (myChart, EchartDom) => {
        console.log('add event listener');
        myChart.on('click', function (obj) {
            console.log('obj', obj);
            if (obj.data && obj.data.name === "湖北") {
                const provinceData = require('@/static/420000.json');
                ChinaMap.fetchData(false, EchartDom, provinceData, "province", 3);
            } else {
                ChinaMap.fetchData(false, EchartDom, chinaJson, "country", 1.2);
            }
        })
    },
    getOptionConfig: (dataList, size) => {
        return {
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
                    if (datas.name === "荆州市") {
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
                    },
                    zoom: size,
                    center: [115.97, 29.71]
                }
            ]
        };
    },

    fetchData: async (netValid, EchartDom, jsonData, type, size = 1.2) => {
        try {
            echarts.registerMap('china', jsonData);
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
            fydata = await ChinaMap.getFyData(isFileExist, netValid);
            console.log('fydata', fydata);
            let dataList, addDaily
            if (type === "country") {
                dataList = fydata.data.data.list;
                addDaily = fydata.data.data.add_daily;
            } else {
                dataList = fydata.data.data.list[1].city;
                addDaily = fydata.data.data.add_daily;
            }
            console.log('addDaily>>>>>>>>>>>', addDaily);
            console.log('dataList>>>>>>>>>>>', dataList);
            option = ChinaMap.getOptionConfig(dataList, size);
            myChart.setOption(option);
            ChinaMap.addEventLS(myChart, EchartDom);
            return true;
        } catch (err) {
            console.error('err in fetch data', err);
            return false;
        }
    },
    getFyData: async (isFileExist, netValid) => {
        let fydata;
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
        return fydata;
    }
}

export {
    ChinaMap
}