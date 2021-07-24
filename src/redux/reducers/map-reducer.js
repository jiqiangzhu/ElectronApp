import { UpdateTime, MapDom, ShowData } from '../actions/map-actions';

const initialState = {
    newTime: '0000-00-00 00:00:00',
    mapDom: "",
    name: "",
    data: ""
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
        case ShowData: {
            console.log('showdata---name', action.payload.name);
            console.log('showdata---data', action.payload.data);
            return {
                ...state,
                name: action.payload.name,
                data: action.payload.data
            }
        }
        default:
            return state;
    }
}

export default mapReducer;