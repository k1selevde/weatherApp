import {atom} from "recoil";
import {DayCityForecastType, OneCallRestType} from "../../types";
import {OptionAutocompleteInputType} from "../../types";

const mainDailyForecastState = atom({
    key: 'mainDailyForecastState',
    default: {} as OneCallRestType
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