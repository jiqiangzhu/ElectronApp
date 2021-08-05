import { MusicPlay, MusicList, CurrentIndex, AudioFlag, NetValid, SelectKey, CurrentTime, ShowLoading } from '../actions/play-actions';
import initialState from '../state';

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
        case SelectKey: {
            return {
                ...state,
                selectedKeys: {
                    oldKey: state.selectedKeys.currentKey,
                    currentKey: action.payload.key
                }
            }
        }
        case CurrentTime: {
            localStorage.currentTime = action.payload.currentTime;
            return {
                ...state,
                currentTime: action.payload.currentTime
            }
        }
        case ShowLoading: {
            return {
                ...state,
                showLoading: action.payload.showLoading
            }
        }
        default:
            return state;
    }
}

export default playReducer;