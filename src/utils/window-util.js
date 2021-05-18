/**
 * 操作窗口工具
 */

// 渲染进程
const { ipcRenderer } = window.require('electron');


const windowUtils = {
    /**
     * 窗口最大化
     * @returns 
     */
    setWindowMax: async function () {
        return await ipcRenderer.send("setMax");
    },

    /**
     * 窗口恢复之前大小
     * @returns 
     */
    setWindowRestore: async function () {
        return await ipcRenderer.send("setRestore");
    },

    /**
     * 关闭窗口
     * @returns 
     */
    setWindowClosed: async function () {
        return await ipcRenderer.send("setClose")
    },
    /**
     * 设置窗口透明度
     * @param {*} value 
     * @returns 
     */
    setWindowOpacity: async function(value) {
        return await ipcRenderer.send("setOpacity", value);
    },
    /**
     * 设置窗口最小化
     * @returns 
     */
    setWindowMin: async function() {
        return await ipcRenderer.send("setMin");
    },

    /**
     * 导入本地文件
     * @returns 
     */
     openFolder: async function(resolve) {
        await ipcRenderer.send("openFolder", "D:/");
        ipcRenderer.once('asynchronous-reply', resolve)
    }

}

export default windowUtils;