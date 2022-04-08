import React, {useEffect} from 'react';
import useDocumentTitle from "../../shared/hooks/useDocumentTitle";
import MainSearchField, {OptionAutocompleteInputType} from "./components/MainSearchField/MainSearchField";
import WeekCarousel from "./components/WeekCarousel/WeekCarousel";
import {useRecoilState} from "recoil";
import {mainDailyForecastState, mainDayForecastState, mainSearchValueState} from './main.state'
import {useQuery} from "react-query";
import DayData from "./components/DayData/DayData";
import styled from "styled-components";
import noDataLightPath from '../../shared/assets/static/noDataLight.svg'


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

    const { data, isSuccess } = useQuery(
        ["posts", searchMainData],
        () => fetchForecastCityData(searchMainData),
        {
            refetchOnWindowFocus: false,
            enabled: !!searchMainData.id
        }
    )

    useEffect(() => {
        if (isSuccess) {
            setForecastData(data)
        }
    }, [data])

    //styles
    const Container = styled.div`
      margin-top: 40px;
      display: flex;
      gap: 40px;
    `

    const WeekContainer = styled.div`
      display: flex;
      flex-direction: column;
      gap: 50px;
    `

    const EmptyWrapper = styled.div`
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      gap: 30px
    `

    const renderWeekColumn = () => {
        return (
            <WeekContainer>
                <WeekCarousel />
            </WeekContainer>
        )
    }

    const emptyBlock = (
        <EmptyWrapper>
            <p>Введите более двух символов в поисковую строку...</p>
            <img src={noDataLightPath} alt="noData" width={'200px'} height={'200px'}/>
        </EmptyWrapper>
    )

    const content = (
        <Container>
            {renderWeekColumn()}
            <DayData data={day}/>
        </Container>
    )

    return (
        <>
            <MainSearchField/>
            {!searchMainData.id ? emptyBlock : content}
        </>
    );
};

export default Main;