import { UpdateTime, MapDom } from '../actions/map-actions';

const initialState = {
    newTime: '0000-00-00 00:00:00',
    mapDom: ""
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
        case MapDom: {
            console.log('mapDom', action.payload.mapDom);
            return {
                ...state,
                mapDom: action.payload.mapDom
            }
        }
        default:
            return state;
    }
}

export default mapReducer;