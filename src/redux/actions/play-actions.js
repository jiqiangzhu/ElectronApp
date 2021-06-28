const MusicPlay = 'Play';
const MusicPause = "Pause";
const MusicList = 'MusicList';
const CurrentIndex = 'CurrentIndex';
const AudioFlag = "audio";
// play pause music
function playMusic(playFlag) {
    return {
        type: MusicPlay,
        payload: { playFlag }
    }
}
// play list
function musicList(musicList) {
    return {
        type: MusicList,
        payload: { musicList }
    }
}
// current music index
function currentIndex(currentIndex, currentAudio) {
    return {
        type: CurrentIndex,
        payload: { currentIndex, currentAudio }
    }
}
// audio ref
function audioRef(currentAudio) {
    return {
        type: AudioFlag,
        payload: { currentAudio }
    }
}
export {
    playMusic as playMusicRedux,
    musicList as musicListRedux,
    currentIndex as currentIndexRedux,
    audioRef as audioRefRedux,
    AudioFlag,
    MusicPlay,
    MusicPause,
    MusicList,
    CurrentIndex
}