export type RestIconsIdType = '01d' | '02d' | '03d' | '04d' | '09d' | '10d' | '11d' | '13d' | '50d' |
    '01n' | '02n' | '03n' | '04n' | '09n' | '10n' | '11n' | '13n' | '50n'

type GeoCityRestType = {
    country: string
    lat: number
    local_names: { [key: string]: string }
    lon: number
    name: string
    state: string
}

type DayCityForecastType = {
    dt: number,
    sunrise: number,
    sunset: number,
    moonrise: number,
    moonset: number,
    moon_phase: number,
    temp: {
        day: number,
        min: number,
        max: number,
        night: number,
        eve: number,
        morn: number
    },
    feels_like: {
        "day": number,
        "night": number,
        "eve": number,
        "morn": number
    },
    pressure: number,
    humidity: number,
    dew_point: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust: number,
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: RestIconsIdType
        }
    ],
    clouds: number,
    pop: number,
    uvi: number
}

type CurrentCityForecastType = {
    dt: number
    feels_like: number
    temp: 289.3
    weather: Array<{
        id: number,
        main: string,
        description: string,
        icon: RestIconsIdType
    }>
    [key: string]: any
}

type OneCallRestType = {
    lat: number
    lon: number
    timezone: string
    timezone_offset: number
    current: CurrentCityForecastType
    minutely?: Array<{ dt: number, precipitation: number }>
    daily?: Array<DayCityForecastType>
    alerts?: Array<AlertRestType>
}

type AlertRestType = {
    description: string,
    end: number,
    event: string,
    sender_name: string,
    start: number
    tags: string[]
}

type OptionAutocompleteInputType = {
    title: string,
    id: string
    lat: number | string,
    lon: number | string
}

type FavoriteCardType = {
    title: string,
    id: string,
    date: number | string
} & OptionAutocompleteInputType

export type {
    AlertRestType,
    CurrentCityForecastType,
    FavoriteCardType,
    GeoCityRestType,
    DayCityForecastType,
    OneCallRestType,
    OptionAutocompleteInputType
}