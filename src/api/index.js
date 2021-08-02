import axios from 'axios';

async function getUserInfor() {
    return axios.get('/user/details');
}

async function getMusicList() {
    return axios.get('/home/musiclist');
}

async function getFYDataFromSina(netValid, url = `https://interface.sina.cn/news/wap/fymap2020_data.d.json`) {
    if (!netValid) {
        url = `/sina/fymap`;
    }
    console.log('url', url);
    return axios.get(url);
}

async function getRecommendPic() {
    return axios.get('/home/recommend');
}

export {
    getUserInfor,
    getMusicList,
    getFYDataFromSina,
    getRecommendPic
}