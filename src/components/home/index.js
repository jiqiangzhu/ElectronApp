import React from 'react';
import { getMusicList } from '../../api';

export default class Home extends React.Component {
    async componentDidMount() {
        let result = await getMusicList();
        console.log("获取播放列表---------------", result);
    }
    render() {

        return (
            <div>
               Home页面
            </div>
        )
    }
}