/**
 * app window-util
 */

// electron render process
const { ipcRenderer } = window.require('electron');

const windowUtils = {
    /**
     * set window max
     * @returns 
     */
    setWindowMax: async function () {
        return await ipcRenderer.send("setMax");
    },

    /**
     * set window restore
     * @returns 
     */
    setWindowRestore: async function () {
        return await ipcRenderer.send("setRestore");
    },

    /**
     * close window
     * @returns 
     */
    setWindowClosed: async function () {
        return await ipcRenderer.send("setClose")
    },
    /**
     * set opacity of window
     * @param {*} value 
     * @returns 
     */
    setWindowOpacity: async function (value) {
        return await ipcRenderer.send("setOpacity", value);
    },
    /**
     * set window min
     * @returns 
     */
    setWindowMin: async function () {
        return await ipcRenderer.send("setMin");
    },

    /**
     * import local files from path
     * @param {*} path 
     * @param {*} resolve 
     */
    openFolder: async function (path, resolve) {
        await ipcRenderer.send("openFolder", path);
        ipcRenderer.once('asynchronous-reply', resolve)
    }

}

export default windowUtils;