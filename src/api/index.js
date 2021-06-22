import axios from 'axios';

async function getUserInfor() {
    return await axios.get('/user/details');
}

async function getMusicList() {
    return await axios.get('/home/musiclist');
}

async function getFYDataFromSina() {
    return await axios.get(`https://interface.sina.cn/news/wap/fymap2020_data.d.json`);
}
export {
    getUserInfor,
    getMusicList,
    getFYDataFromSina
}