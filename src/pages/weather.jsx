import { useState, useEffect } from "react";
import moment from "moment";
import { store } from "../store";
import { addFavorite, loadFavorites, removeFavorite } from "../store/actions/favoritesActions";
import { setCity, setCityName, setKey } from "../store/actions/cityActions";

export default function Weather() {
    const [searchInput, setSearchInput] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [days, setDays] = useState([]);
    const [name, setName] = useState("");
    const [isInFavorites, setIsInFavorites] = useState(false);
    const [metric, setMetric] = useState(true);
    store.dispatch(loadFavorites());

    useEffect(() => {
        const key = store.getState().cityModule.key;
        if (sessionStorage.getItem(key)) {
            store.dispatch(setCity(JSON.parse(sessionStorage.getItem(key))))
            setName(store.getState().cityModule.cityName)
            show5days(key);
            ifInFavorites(store.getState().cityModule.cityName);
        } else {
            fetch(`https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=LizE6tVMMuTbH3ZYFq2nnLl4liNALkbp&language=en`)
                .then((res) => {
                    if (res.ok) {
                        res.json().then((data) => {
                            sessionStorage.setItem(key, JSON.stringify(data));
                            store.dispatch(setCity(JSON.parse(sessionStorage.getItem(key))))
                            setName(store.getState().cityModule.cityName)
                            show5days(key);
                            ifInFavorites(store.getState().cityModule.cityName);
                        })
                    } else alert(res)
                })
                .catch((err) => {
                    alert(err);
                });
        }
    }, []);

    const searchCity = (input) => {
        if (sessionStorage.getItem(input)) {
            setSearchData(JSON.parse(sessionStorage.getItem(input)));
        } else {
            fetch(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=LizE6tVMMuTbH3ZYFq2nnLl4liNALkbp&q=${input}&language=en`)
                .then((res) => {
                    res.json().then((data) => {
                        sessionStorage.setItem(input, JSON.stringify(data));
                        setSearchData(data)
                    })
                })
                .catch((err) => {
                    alert(err);
                });
        }
    }

    const showWeather = (ev) => {
        ev.preventDefault();
        const data = JSON.parse(sessionStorage.getItem(searchInput));
        const key = data[0].Key
        if (sessionStorage.getItem(key)) {
            store.dispatch(setCity(JSON.parse(sessionStorage.getItem(key))))
            store.dispatch(setCityName(searchInput))
            store.dispatch(setKey(key))
            setName(searchInput)
            show5days(key);
            ifInFavorites(searchInput);
        } else {
            fetch(`https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=LizE6tVMMuTbH3ZYFq2nnLl4liNALkbp&language=en`)
                .then((res) => {
                    if (res.ok) {
                        res.json().then((data) => {
                            sessionStorage.setItem(key, JSON.stringify(data));
                            store.dispatch(setCity(data))
                            store.dispatch(setCityName(searchInput))
                            store.dispatch(setKey(key))
                            setName(searchInput)
                            show5days(key);
                            ifInFavorites(searchInput);
                        })
                    } else alert(res)
                })
                .catch((err) => {
                    alert(err);
                });
        }
    }
    const show5days = (cityKey) => {
        if (sessionStorage.getItem(cityKey + "_5")) {
            setDays(JSON.parse(sessionStorage.getItem(cityKey + "_5")));
        } else {
            fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=LizE6tVMMuTbH3ZYFq2nnLl4liNALkbp&language=en&metric=${metric}`)
                .then((res) => {
                    if (res.ok) {
                        res.json().then((data) => {
                            sessionStorage.setItem(cityKey + "_5", JSON.stringify(data));
                            setDays(data)
                        })
                    } else alert(res)
                })
                .catch((err) => {
                    alert(err);
                });
        }
    }
    const addToFavorites = (ev) => {
        ev.preventDefault();
        const favorite = {
            id: name + '_fav',
            city: store.getState().cityModule.city,
            key: store.getState().cityModule.key,
            cityName: name
        }
        store.dispatch(addFavorite(favorite));
        setIsInFavorites(true);
    }
    const removeFromFavorites = (ev) => {
        ev.preventDefault();
        store.dispatch(removeFavorite(name + '_fav'));
        setIsInFavorites(false);
    }
    const ifInFavorites = (name) => {
        const { favorites } = store.getState().favoritesModule;
        const index = favorites.findIndex(fav => fav.cityName === name)
        setIsInFavorites(index !== -1);
    }
    const switchMode = (ev) => {
        ev.preventDefault();
        setMetric(!metric);
    }

    const inputCity = (ev) => {
        ev.preventDefault();
        const value = ev.target.value;
        console.log(value);
        setSearchInput(value);
        searchCity(value)
    }
    const handleChange = (ev) => {
        ev.preventDefault();
        const value = ev.target.value;
        setSearchInput(value);
        if (value) searchCity(value)
        else setSearchData([])
    };
    return (
        <div className="weather">
            <form autoComplete="off">
                <input
                    type="Search"
                    placeholder="Enter City Name"
                    title="Please Enter Valid City Name"
                    value={searchInput}
                    onChange={handleChange} />
                <button onClick={showWeather}>Search</button>
                <div className="searchData">
                    {searchData.map((data, i) => {
                        return <button key={i} onClick={inputCity} value={data.LocalizedName}>{data.LocalizedName}</button>
                    })}
                </div>
            </form>

            {store.getState().cityModule.city && store.getState().cityModule.city.map((data, i) => {
                return <div key={i} className='city'>
                    <div className="cityInfo">
                        <p>{name}</p>
                        <p>{moment(data.LocalObservationDateTime).format("dddd , MMMM Do YYYY")}</p>
                        <p>{data.WeatherText}</p>
                        {metric ? <p>{data.Temperature.Metric.Value}º{data.Temperature.Metric.Unit} </p> :
                            <p>{data.Temperature.Imperial.Value}º{data.Temperature.Imperial.Unit} </p>}
                    </div>
                    <button onClick={switchMode}>{metric ? "Fahrenheit" : "Celsius"}</button>
                    {!isInFavorites && <button onClick={addToFavorites}>Add To Favorits</button>}
                    {isInFavorites && <button onClick={removeFromFavorites}>Remove From Favorits</button>}
                </div>
            })}
            {days.DailyForecasts && <h1>5 Day Weather {name}</h1>}
            <div className="days">
                {days.DailyForecasts && days.DailyForecasts.map((data, i) => {
                    return <div key={i} className="day" >
                        <p>{moment(data.Date).format("dddd , MMMM Do YYYY")}</p>
                        <p>{data.Day.IconPhrase}</p>
                        <p>{data.Temperature.Minimum.Value}º{data.Temperature.Minimum.Unit} - {data.Temperature.Maximum.Value}º{data.Temperature.Maximum.Unit}</p>
                    </div>
                })}
            </div>
        </div >
    );
}
