import { MusicPlay, MusicPause, MusicList, CurrentIndex, AudioFlag } from '../actions/play-actions';

const initialState = {
    playFlag: "pause",
    musicList: [],
    currentIndex: 0,
    currentAudio: {},
    currentSrc: ""

}

function playReducer(state = initialState, action) {
    switch (action.type) {
        case MusicPlay: {
            return {
                ...state,
                playFlag: action.payload.playFlag
            }
        }
        case MusicPause: {
            return {
                ...state,
                playFlag: action.payload.playFlag
            }
        }
        case MusicList: {
            return {
                ...state,
                currentIndex: action.payload.currentIndex ? action.payload.currentIndex : 0,
                musicList: action.payload.musicList,
                currentSrc: action.payload.musicList[0]
            }
        }
        case CurrentIndex: {
            action.payload.currentAudio.src = state.musicList[action.payload.currentIndex];
            return {
                ...state,
                currentIndex: action.payload.currentIndex,
                currentAudio: action.payload.currentAudio
            }
        }
        case AudioFlag: {
            return {
                ...state,
                currentAudio: action.payload.currentAudio
            }
        }
        default:
            return state;
    }
}

export default playReducer;