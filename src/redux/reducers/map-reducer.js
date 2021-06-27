import { UpdateTime } from '../actions/map-actions';

const initialState = {
    newTime: '0000-00-00 00:00:00'
}

function mapReducer(state = initialState, action) {
    switch (action.type) {
        case UpdateTime: {
            console.log('action', action.payload.newTime);
            return {
                ...state,
                newTime: action.payload.newTime
            }
        }
        default:
            return state;
    }
}

export default mapReducer;