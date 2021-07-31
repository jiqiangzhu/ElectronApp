import { MusicPlay, MusicList, CurrentIndex, AudioFlag, NetValid } from '../actions/play-actions';

const initialState = {
    playFlag: "pause",
    musicList: [],
    currentIndex: localStorage.currentIndex ? parseInt(localStorage.currentIndex) : 0,
    currentAudio: {},
    currentSrc: "",
    netValid: false
}

function playReducer(state = initialState, action) {
    switch (action.type) {
        case MusicPlay: {
            return {
                ...state,
                playFlag: action.payload.playFlag
            }
        }
        case MusicList: {
            // localStorage.removeItem("currentIndex")
            return {
                ...state,
                musicList: action.payload.musicList
            }
        }
        case CurrentIndex: {
            action.payload.currentAudio.src = state.musicList[action.payload.currentIndex];
            localStorage.currentIndex = action.payload.currentIndex;
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
        case NetValid: {
            return {
                ...state,
                netValid: action.payload.netValid
            }
        }
        default:
            return state;
    }
}

export default playReducer;