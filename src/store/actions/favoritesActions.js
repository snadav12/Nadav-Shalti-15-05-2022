export function loadFavorites() {
    return async dispatch => {
        const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
        dispatch({ type: 'SET_FAVORITES', favorites })
    }
}
export function addFavorite(favorite) {
    return async dispatch => {
        const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
        favorites.push(favorite);
        sessionStorage.setItem("favorites", JSON.stringify(favorites));
        dispatch({ type: 'ADD_FAVORITE', favorite })
    }
}


export function removeFavorite(favoriteId) {
    return async dispatch => {
        const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
        const index = favorites.findIndex(favorite => favorite.id === favoriteId)
        favorites.splice(index, 1);
        sessionStorage.setItem("favorites", JSON.stringify(favorites));
        dispatch({ type: 'REMOVE_FAVORITE', favoriteId })
    }
}