import axios from 'axios';


function getUserInfor() {
    return axios.get("http://api.blairq.top/")
}


export {
    getUserInfor
}