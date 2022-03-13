export type RestIconsIdTypes = '01d' | '02d' | '03d' | '04d' | '09d' | '10d' | '11d' | '13d' | '50d' |
    '01n' | '02n' | '03n' | '04n' | '09n' | '10n' | '11n' | '13n' | '50n'

type GeoCityRestType = {
    country: string
    lat: number
    local_names: {[key: string]: string}
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
            icon: RestIconsIdTypes
        }
    ],
    clouds: number,
    pop: number,
    uvi: number
}

type ForecastCityRestType = {
    lat: number
    lon: number
    timezone: string
    timezone_offset: number
    current?: {[key: string]: any}
    minutely?: Array<{dt: number, precipitation: number}>
    daily?: Array<DayCityForecastType>
}

export type {
    ForecastCityRestType,
    GeoCityRestType,
    DayCityForecastType
}