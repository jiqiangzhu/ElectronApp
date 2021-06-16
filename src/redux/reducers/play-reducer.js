import { MusicPlay, MusicPause } from '../actions/play-actions';

const initialState = {
    playFlag: "pause"
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
        default:
            return state;
    }
}

export default playReducer;