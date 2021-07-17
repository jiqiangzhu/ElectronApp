const UpdateTime = 'updateTime';
const MapDom = "mapDom";

// play pause music
function updateMap(newTime) {
    return {
        type: UpdateTime,
        payload: { newTime }
    }
}
// covid map
function setMapDom(mapDom) {
    return {
        type: MapDom,
        payload: { mapDom }
    }
}
export {
    updateMap as updateMapRedux,
    setMapDom as setMapDomRedux,
    UpdateTime,
    MapDom
}