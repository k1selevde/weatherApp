import React from 'react';
import {useIntl} from "react-intl";
import {useQuery} from "react-query";
import {useNavigate} from "react-router-dom";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import styled from "styled-components";
import {fetchForecastCityData} from '../../api';
import spinner from '../../shared/assets/animated/spinner.svg'
import {handleErrorRedirect} from "../../shared/helpers/common";
import useDocumentTitle from "../../shared/hooks/useDocumentTitle";
import Icon from "../../shared/ui-kit/Icon";
import {DayCityForecastType, OneCallRestType} from '../../types';
import DayData from "./components/DayData";
import MainFavoriteButton from "./components/MainFavoriteButton";
import MainSearchField from "./components/MainSearchField";
import WeekList from "./components/WeekList";
import {mainDailyForecastState, mainDayForecastState, mainSearchValueState} from './main.state'

const Main = () => {
    const intl = useIntl()
    const navigate = useNavigate()

    useDocumentTitle(intl.formatMessage({id: 'tab.main'}))

    const searchValue = useRecoilValue(mainSearchValueState);
    const setForecastData = useSetRecoilState(mainDailyForecastState)
    const [day, setDayForecastData] = useRecoilState(mainDayForecastState)

    const handleRequestCityDataSuccess = (data: OneCallRestType) => {
        setForecastData(data)
        setDayForecastData({} as DayCityForecastType)
    }

    const { isLoading } = useQuery<OneCallRestType>(
        ["posts", searchValue],
        () => fetchForecastCityData(searchValue),
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            enabled: !!searchValue.id,
            onSuccess: handleRequestCityDataSuccess,
            onError: handleErrorRedirect(navigate)
        }
    )

    const weekColumn = (
        <WeekContainer>
            <WeekList />
        </WeekContainer>
    )

    const emptyBlock = (
        <EmptyWrapper>
            <p>{intl.formatMessage({id: "main.emptySearchMessage"}, {count: '2'})}</p>
            <Icon iconType={'noData'} />
        </EmptyWrapper>
    )

    const content = (
        <ContentContainer>
            {isLoading ? <img src={spinner} alt="loading"/> : weekColumn}
            <DayData data={day}/>
        </ContentContainer>
    )

    return (
        <>
            <TopContainer>
                <MainSearchField />
                <MainFavoriteButton currentValue={searchValue} />
            </TopContainer>
            {!searchValue.id ? emptyBlock : content}
        </>
    );
};


const TopContainer = styled.div`
    display: flex;
    gap: 25px;
`

const ContentContainer = styled.div`
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

export default Main;