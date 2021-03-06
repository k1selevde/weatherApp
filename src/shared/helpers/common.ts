import {NavigateFunction} from "react-router-dom";
import {GeoCityRestType, OptionAutocompleteInputType} from "../../types";

const ArrayAndNotEmpty = (arr: any): boolean => Array.isArray(arr) && arr.length > 0

const IsEmptyObject = (obj: Object) => Object.keys(obj).length === 0;

const kelvinToCelsius = (val: number) => Math.floor(val - 273.15);

/**
 * @param {number} ms количество милллисекунд
 * @param {Object} options маска даты
 * @param {number} tz маска даты
 * @return {string} возвращает дату в формате переданной маски.
 * */
const getDateByMask = (ms: number, options: Object, tz: number = 0): string => {
    if (!ms) return ""

    const date = new Date(ms - tz * 1000);

    return new Intl.DateTimeFormat('ru-RU', options || {}).format(date);
}

const handleErrorRedirect = (navigateFn: NavigateFunction) => () => {
    navigateFn('/500')
}

const mapCityOptions = (cities: Array<GeoCityRestType>): Array<OptionAutocompleteInputType> => {

    return cities?.map((city: GeoCityRestType) => {
        const title = [city.name, city.state, city.country].join(', ')

        return ({
            title,
            id: `${city.lat}-${city.lon}`,
            lat: city.lat,
            lon: city.lon
        })
    })
}

export {
    ArrayAndNotEmpty,
    IsEmptyObject,
    handleErrorRedirect,
    getDateByMask,
    kelvinToCelsius,
    mapCityOptions
}

