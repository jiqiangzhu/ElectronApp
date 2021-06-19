const commonUtils = {
    /**
     * Seconds to minutes: seconds
     * @param {seconds} sec 
     * @returns 
     */
    secondsFormat: function (sec, len = 2) {
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
        return len === 3 ? hour + ":" + minute + ":" + second : minute + ":" + second;
    },
    /**
     * Generate any number from 1 to max 
     * [) close left open right
     * @param {max integer} max 
     * @returns 
     */
    randomInteger: function (currentIndex, max) {
        let result = parseInt(Math.random() * max, 10);
        // if result equals currentIndex, recursion
        if (result === currentIndex) {
            return this.randomInteger(currentIndex, max);
        }
        return result;
    },

    delay2s: function (resolve) {
        setTimeout({
            resolve
        }, 2000)
    }

}

export default commonUtils;