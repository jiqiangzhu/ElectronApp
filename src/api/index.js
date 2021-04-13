import axios from 'axios';

async function getUserInfor() {
    return await axios.get('/user/details');
}

async function getMusicList() {
    return await axios.get('/home/musiclist');
}

export {
    getUserInfor,
    getMusicList
}