const UpdateTime = 'updateTime';

// play pause music
function updateMap(newTime) {
    return {
        type: UpdateTime,
        payload: { newTime }
    }
}

export {
    updateMap as updateMapRedux,
    UpdateTime
}