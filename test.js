const isOnline = require('is-online');
// console.log(localStorage);
let online = false

let i = 0
window.addEventListener('online', () => {
    console.log('online');
})
window.addEventListener('offline', () => {
    console.log('offline');
})
let timer = setInterval(() => {
    i++
    if (i === 3) {
        clearInterval(timer)
    }
}, 10000)
// const setMyInterval = async function () {
//     if (localStorage.timer) {
//         clearInterval(parseInt(localStorage.timer));
//         localStorage.removeItem("timer");
//     }
//     const timer = setInterval(async () => {
//         try {
//             store.dispatch(checkNetRedux(await windowUtils.checkIsOnline()));
//             console.log('netValid', store.getState().playReducer.netValid);
//         } catch (e) {
//             console.error('e', e);
//             store.dispatch(checkNetRedux(false))
//         }
//     }, 20000);

//     localStorage.timer = timer;
// }