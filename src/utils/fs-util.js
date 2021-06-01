/**
 * local file utils 
 */

const fs = window.require('fs-extra');
const fsUtils = {
    /**
     * read all files in path
     * @param {*} path dir path
     * @param {*} resolve func
     * @returns 
     */
    readMusicDir: async (path, resolve) => {
        if (!path) {
            return;
        }
        localStorage.defaultMusicPath = path;
        fs.readdir(path, resolve);
    }
}

export default fsUtils;