import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { favoritesReducer } from './reducers/favoritesReducer';
import { cityReducer } from './reducers/cityReducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    favoritesModule: favoritesReducer,
    cityModule: cityReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))