import axios from 'axios';

export async function getUserInfor() {
    return await axios.get('/user/details');
}