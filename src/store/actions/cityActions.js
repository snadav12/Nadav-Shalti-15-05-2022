export function setCity(city) {
    return async dispatch => {
        dispatch({ type: 'SET_CITY', city })
    }
}
export function setCityName(cityName) {
    return async dispatch => {
        dispatch({ type: 'SET_CITYNAME', cityName })
    }
}
export function setKey(key) {
    return async dispatch => {
        dispatch({ type: 'SET_KEY', key })
    }
}