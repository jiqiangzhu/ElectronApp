import { MusicPlay, MusicPause, MusicList, CurrentIndex, AudioFlag } from '../actions/play-actions';

const initialState = {
    playFlag: "pause",
    musicList: [],
    currentIndex: 0,
    audioRef: ""

}

function playReducer(state = initialState, action) {
    switch (action.type) {
        case MusicPlay: {
            return {
                playFlag: action.payload.playFlag
            }
        }
        case MusicPause: {
            return {
                playFlag: action.payload.playFlag
            }
        }
        case MusicList: {
            return {
                musicList: action.payload.musicList
            }
        }
        case CurrentIndex: {
            return {
                currentIndex: action.payload.currentIndex
            }
        }
        case AudioFlag: {
            return {
                ...state,
                audioRef: action.payload.audioRef
            }
        }
        default:
            return state;
    }
}

export default playReducer;