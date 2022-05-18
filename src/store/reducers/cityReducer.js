const INITIAL_STATE = {
    city: [],
    cityName: 'Tel Aviv',
    key: '215854'
}
export function cityReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_CITY':
            return {
                ...state,
                city: action.city
            }
        case 'SET_CITYNAME':
            return {
                ...state,
                cityName: action.cityName
            }
        case 'SET_KEY':
            return {
                ...state,
                key: action.key
            }
        default:
            return state
    }
}