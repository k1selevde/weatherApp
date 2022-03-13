import React, {useEffect} from 'react';
import useDocumentTitle from "../../shared/hooks/useDocumentTitle";
import styles from './Main.module.sass'
import MainSearchField, {OptionAutocompleteInputType} from "./components/MainSearchField/MainSearchField";
import WeekCarousel from "./components/WeekCarousel/WeekCarousel";
import {useRecoilState, useRecoilValue} from "recoil";
import {mainDailyForecastState, mainDayForecastState, mainSearchValueState} from './main.state'
import {useQuery} from "react-query";
import DayData from "./components/DayData/DayData";
import styled from "styled-components";

const fetchForecastCityData = async ({lat, lon}: OptionAutocompleteInputType) => {
    const apiKey = process.env.REACT_APP_API_KEY

    const cnt = 7


    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&cnt=${cnt}`
    );

    if (!response.ok) {
        throw new Error(`Network response was not ok`, )
    }

    return response.json();
}

const Main = () => {
    useDocumentTitle('Main')

    const [searchMainData, _] = useRecoilState(mainSearchValueState);
    const [__, setForecastData] = useRecoilState(mainDailyForecastState)
    const [day, ___] = useRecoilState(mainDayForecastState)

    const { data, error, isLoading, isSuccess, isRefetching, isError } = useQuery(
        ["posts", searchMainData],
        () => fetchForecastCityData(searchMainData),
        {
            refetchOnWindowFocus: false,
            // enabled: false
        }
    )

    useEffect(() => {
        if (isSuccess) {
            setForecastData(data)
        }
    }, [data])

    //styles
    const Container = styled.div`
      display: flex;
      gap: 40px;
    `

    const WeekContainer = styled.div`
      display: flex;
      flex-direction: column;
      gap: 50px;
    `

    const renderWeekColumn = () => {
        return (
            <WeekContainer>
                <MainSearchField />
                <WeekCarousel />
            </WeekContainer>
        )
    }

    return (
        <Container>
            {renderWeekColumn()}
            <DayData data={day}/>
        </Container>
    );
};

export default Main;