const MusicPlay = 'Play';
const MusicPause = "Pause";

function playMusic(playFlag) {
    return {
        type: MusicPlay,
        payload: { playFlag }
    }
}
function pauseMusic(playFlag) {
    return {
        type: MusicPause,
        payload: { playFlag }
    }
}

export {
    playMusic as playMusicRedux,
    pauseMusic as pauseMusicRedux,
    MusicPlay,
    MusicPause
}