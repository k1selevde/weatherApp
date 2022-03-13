import { atom } from "recoil";
import {DayCityForecastType, ForecastCityRestType} from "../../types";
import {OptionAutocompleteInputType} from "./components/MainSearchField/MainSearchField";

const mainDailyForecastState = atom({
    key: 'mainDailyForecastState', // уникальный ID (по сравнению с другими атомами/селекторами)
    default: {} as Array<DayCityForecastType>, // дефолтное (начальное) значение
});

const mainDayForecastState = atom({
    key: 'mainDayForecastState', // уникальный ID (по сравнению с другими атомами/селекторами)
    default: {} as DayCityForecastType, // дефолтное (начальное) значение
});

const mainSearchValueState = atom({
    key: 'mainSearchValueState',
    default: {} as OptionAutocompleteInputType
})

export {
    mainDailyForecastState,
    mainSearchValueState,
    mainDayForecastState
}