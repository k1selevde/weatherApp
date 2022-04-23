import {FavoriteCardType, OneCallRestType, OptionAutocompleteInputType} from "./types";

const fetchCityGeolocations = async (query: string) => {
    const apiKey = process.env.REACT_APP_API_KEY

    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
    );

    if (!response.ok) {
        throw new Error(`Network response was not ok`)
    }

    return response.json();
}

const fetchForecastCityData = async ({lat, lon}: OptionAutocompleteInputType) => {
    const apiKey = process.env.REACT_APP_API_KEY

    const cnt = 7

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&cnt=${cnt}`
    );

    if (!response.ok) {
        throw new Error(`Network response was not ok`)
    }

    return response.json();
}

const fetchNotifications = async (city: FavoriteCardType): Promise<OneCallRestType> => {
    const apiKey = process.env.REACT_APP_API_KEY

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude=minutely,hourly,daily,current&appid=${apiKey}`
    );

    if (!response.ok) {
        throw new Error(`Network response was not ok`)
    }

    return response.json();
}

export {
    fetchCityGeolocations,
    fetchForecastCityData,
    fetchNotifications
}