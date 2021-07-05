import echarts from 'echarts';
import chinaJson from '@/static/china.json'
import { getFYDataFromSina } from '@/api';
import fsUtils from '@/utils/fs-util';
import { commonUtils } from '@localUtils/';
import store from 'src/redux';
import { updateMapRedux } from '@redux/actions/map-actions';

let listenerMap = null, type = "country", size = 1;
let mapName = "China", EchartDom, provinceObj, provinceCode, provinceData, cityObj, cityCode, cityData;
const { province, city } = require('province-city-china/data');

const ChinaMap = {
    // entry
    initalECharts: (myEchartDom, netValid) => {
        let result = false;
        EchartDom = myEchartDom;
        try {
            mapName = "China";
            type = "country";
            size = 1.2;
            result = ChinaMap.fetchData(netValid, chinaJson);
            return result;
        } catch (err) {
            console.error('initalECharts err', err);
            return false;
        }
    },
    // add event listener
    addEventLS: (myChart) => {
        listenerMap = myChart.on('click', function (obj) {
            if (obj.data && obj.data.citycode) {// city
                size = 1;
                cityObj = city.find(item => item.name === obj.data.name);
                console.log(`cityObj------------>>>>>${cityObj}`);
                if (cityObj) {
                    cityCode = cityObj.code;
                    mapName = obj.data.name;
                    cityData = require(`@/static/map/citys/${cityCode}.json`);
                    type = "city";
                    ChinaMap.fetchData(false, cityData);
                }
            } else if (obj.data && obj.data.city) { // province
                size = 1;
                provinceObj = province.find(item => item.name.slice(0, 2) === obj.data.name.slice(0, 2));
                console.log(`provinceObj--------->>>>>${cityObj}`);
                if (provinceObj) {
                    provinceCode = provinceObj.code;
                    mapName = obj.data.ename;
                    provinceData = require(`@/static/map/province/${provinceCode}.json`);
                    type = "province"
                    ChinaMap.fetchData(false, provinceData);
                }
            } else {
                mapName = "China";
                type = "country";
                size = 1.2;
                ChinaMap.fetchData(false, chinaJson);
            }
            return 1;
        })
    },
    // get map data
    fetchData: async (netValid, jsonData) => {
        try {
            if (!EchartDom) {
                throw new Error(`EchartDom is undefined`)
            }
            echarts.registerMap(mapName, jsonData);
            const myChart = echarts.init(EchartDom, 'dark');
            console.log('myChart', myChart);
            let fydata, isFileExist, option;
            // try {
            //     await fsUtils.fileStat('src/static/fydata.json');
            //     isFileExist = true;
            // } catch (err) {
            //     console.error('err', err);
            //     isFileExist = false;
            // }
            isFileExist = true;
            console.log('netValid', netValid);
            // (toady or net avaliable) and file exist, load local file
            fydata = await ChinaMap.getFyData(isFileExist, netValid);
            // set last update time in redux
            store.dispatch(updateMapRedux(commonUtils.dateTimeFormat(fydata.data.data.cachetime)));
            console.log('fydata----', fydata);
            let dataList, addDaily;
            // all feiyan data
            const allFyData = fydata.data.data;
            dataList = allFyData.list;
            addDaily = allFyData.add_daily;
            if (type === "province") {
                let name = provinceObj.name.slice(0, 2);
                let curIndex = dataList.findIndex((item, index) => {
                    if (item.name.slice(0, 2) === name) {
                        return index;
                    } else if (index === dataList.length) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
                if (curIndex !== -1 && curIndex !== 0) {
                    console.log('curIndex', curIndex);
                    dataList = allFyData.list[curIndex].city;
                } else {
                    throw new Error('file not exist')
                }
            } else if (type === "city") {
                dataList = allFyData.list;
                console.log('dataList--city------', dataList);
            }
            console.log('addDaily>>>>>>>>>>>', addDaily);
            console.log('dataList>>>>>>>>>>>', dataList);
            option = ChinaMap.getOptionConfig(dataList);
            myChart.setOption(option);
            if (listenerMap === null) {
                ChinaMap.addEventLS(myChart);
            }
            return true;


        } catch (err) {
            console.error('err in fetch data', err);
            return false;
        }
    },
    // get config of map
    getOptionConfig: (dataList) => {
        let mapList = dataList.map((item, index) => {
            if (isNaN(item.value)) {
                item.value = parseInt(item.conNum);
                item.name = item.mapName;
            }
            return item;
        })

        return {
            backgroundColor: 'transparent',
            title: {
                text: `COVID-19 map in ${mapName}`,
                x: 'left',
                textStyle: {
                    color: '#ff0000'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function (datas) {
                    try {
                        return `${datas.name}<br/>累计确诊人数：${!isNaN(datas.value) ? datas.value : 0}<br/>累计死亡人数：${!isNaN(datas.data.deathNum) ? datas.data.deathNum : 0}`;

                    } catch (err) {
                        console.warn(`format error \n${err}`);
                    }
                }
            },
            toolbox: {
                show: true,
                right: '30',
                bottom: '30',
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: true, title: 'Data View' },
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
                    data: mapList,
                    type: 'map',
                    mapType: mapName,
                    roam: false,
                    itemStyle: {
                        normal: {
                            borderWidth: 0.5
                        },
                        emphasis: {
                            borderWidth: 1
                        }
                    },
                    zoom: size,
                    left: 100,
                    top: 30
                }
            ]
        };
    },
    // get feiyan data from local or net
    getFyData: async (isFileExist, netValid) => {
        let fydata;
        if (isFileExist && !netValid) {
            fydata = await getFYDataFromSina(false);
        } else {// file not exist, request sina data and save local
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