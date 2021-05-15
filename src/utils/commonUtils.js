const commonUtils = {

    /**
     * 秒 转 分:秒 工具
     * @param {秒} sec 
     * @returns 
     */
    secondsFormat: function (sec){
        let hour = Math.floor(sec / 3600);
        let minute = Math.floor((sec - hour * 3600) / 60);
        let second = sec - hour * 3600 - minute * 60;
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }
        return minute + ":" + second;
    }
}

export default commonUtils;