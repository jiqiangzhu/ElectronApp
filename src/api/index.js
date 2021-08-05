import axios from 'axios';
import store from 'src/redux';
import { setShowLoaingRedux } from 'src/redux/actions/play-actions';


//  url = `https://interface.sina.cn/news/wap/fymap2020_data.d.json`

const Api = {
    get: async (url, netValid = true) => {
        // open loading popup
        store.dispatch(setShowLoaingRedux(true))
        // ajax
        let result = await axios.get(url);

        // close loading popup
        store.dispatch(setShowLoaingRedux(false))
        return result;
    }
}


export default Api;