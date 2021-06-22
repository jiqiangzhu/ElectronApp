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
    readMusicDir: (path, resolve) => {
        if (!path) {
            return;
        }
        localStorage.defaultMusicPath = path;
        fs.readdir(path, resolve);
    },
    /**
     * read content of files
     * @param {*} filename 
     * @param {*} resolve 
     */
    readFile: (filename, resolve) => {
        if (!filename) {
            return;
        }
        fs.readFile(filename, 'utf-8', resolve);
    },
    fileStat: (filename, resolve) => {
        if (!filename) {
            return;
        }
        fs.stat(filename, resolve)
    }

}

export default fsUtils;