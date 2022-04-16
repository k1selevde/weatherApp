import { atom } from "recoil";
import {DayCityForecastType, ForecastCityRestType} from "../../types";
import {OptionAutocompleteInputType} from "./components/MainSearchField/MainSearchField";

const mainDailyForecastState = atom({
    key: 'mainDailyForecastState',
    default: {} as ForecastCityRestType
});

const mainDayForecastState = atom({
    key: 'mainDayForecastState',
    default: {} as DayCityForecastType
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