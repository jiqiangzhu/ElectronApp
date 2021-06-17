const MusicPlay = 'Play';
const MusicPause = "Pause";
const MusicList = 'MusicList';
const CurrentIndex = 'CurrentIndex';
const AudioFlag = "audio";
// play music
function playMusic(playFlag) {
    return {
        type: MusicPlay,
        payload: { playFlag }
    }
}
// pause music
function pauseMusic(playFlag) {
    return {
        type: MusicPause,
        payload: { playFlag }
    }
}
// play list
function musicList(list) {
    return {
        type: MusicList,
        payload: { list }
    }
}
// current music index
function currentIndex(index) {
    return {
        type: CurrentIndex,
        payload: { index }
    }
}
// audio ref
function audioRef(playFlag) {
    return {
        type: AudioFlag,
        payload: { playFlag }
    }
}
export {
    playMusic as playMusicRedux,
    pauseMusic as pauseMusicRedux,
    musicList as musicListRedux,
    currentIndex as currentIndexRedux,
    audioRef as audioRefRedux,
    AudioFlag,
    MusicPlay,
    MusicPause,
    MusicList,
    CurrentIndex
}