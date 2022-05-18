import { useEffect, useState } from "react";
import { store } from "../store";
import { loadFavorites } from "../store/actions/favoritesActions";
import { setCity, setCityName, setKey } from "../store/actions/cityActions";
import { useNavigate } from "react-router-dom";


export default function Favorites() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        store.dispatch(loadFavorites());
        setFavorites(store.getState().favoritesModule.favorites);
    }, [])
    const showDays = (ev, favorite) => {
        ev.preventDefault();
        store.dispatch(setCity(favorite.city));
        store.dispatch(setCityName(favorite.cityName));
        store.dispatch(setKey(favorite.key));
        navigate("/")
    }

    return (
        <div className="favorites">
            {favorites.map((favorite, i) => {
                return <div key={i} className="favorite" onClick={(ev) => showDays(ev, favorite)} >
                    <p>{favorite.cityName}</p>
                    <p>{favorite.city[0].WeatherText}</p>
                    <p>{favorite.city[0].Temperature.Metric.Value}º{favorite.city[0].Temperature.Metric.Unit} </p>
                </div>
            })}
        </div>
    );
}
