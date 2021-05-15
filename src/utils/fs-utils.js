const fs = window.require('fs-extra');
const fsUtils = {
    /**
     * 读取路径中所有文件
     * @param {*} path 文件件路径
     * @param {*} resolve 回调函数
     * @returns 
     */
    readMusicDir: async (path, resolve) => {
        if (!path) {
            return;
        }
        fs.readdir(path, resolve)
    }
}

export default fsUtils;