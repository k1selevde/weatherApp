import React, {useCallback} from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import styled from 'styled-components';
import {localeState} from "../../../i18n";
import {ArrayAndNotEmpty} from '../../../shared/helpers/common';
import {DayCityForecastType} from '../../../types';
import {mainDailyForecastState, mainDayForecastState} from "../main.state";
import TempByDay from "./TempByDay";

const WeekList = () => {
    const forecastCityData = useRecoilValue(mainDailyForecastState)
    const [currentDay, setDay] = useRecoilState(mainDayForecastState)
    const locale = useRecoilValue(localeState)

    const {daily} = forecastCityData

    const handleClickSliderItem = useCallback((day: DayCityForecastType) => {
        setDay(day)
    }, [])

    const list = (
        <List>
            {daily
                ?.slice(0,5)
                .map(
                    (day: DayCityForecastType) => (
                        <TempByDay
                            key={day.dt}
                            data={day}
                            onClick={handleClickSliderItem}
                            isActive={currentDay.dt === day.dt}
                            locale={locale}
                        />
                ))
            }
        </List>
    )

    return (
        <>
            {ArrayAndNotEmpty(daily) && list}
        </>
    );
};


const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export default WeekList;