import L, {LatLngTuple} from 'leaflet';
import React from 'react';
import {useIntl} from "react-intl";
import {useQuery} from "react-query";
import {useNavigate} from "react-router-dom";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import styled from "styled-components";
import {fetchForecastCityData} from "../../api";
import {handleErrorRedirect} from "../../shared/helpers/common";
import useDocumentTitle from "../../shared/hooks/useDocumentTitle";
import {DayCityForecastType, OneCallRestType} from "../../types";
import MainSearchField from '../Main/components/MainSearchField';
import {mainDailyForecastState, mainDayForecastState, mainSearchValueState} from "../Main/main.state";
import InteractiveMap from "./components/InteractiveMap";

const Map = () => {
    //костыль для решения старой проблемы добавления лишних символов в src uri при попытки загрузки статики
    L.Icon.Default.imagePath = 'leaflet/';

    const intl = useIntl()
    const navigate = useNavigate()

    useDocumentTitle(intl.formatMessage({id: "tab.map"}))

    const searchValue = useRecoilValue(mainSearchValueState);
    const [data, setForecastData] = useRecoilState(mainDailyForecastState)
    const setDayForecastData = useSetRecoilState(mainDayForecastState)

    const handleRequestSuccess = (data: OneCallRestType) => {
        setForecastData(data)
        setDayForecastData({} as DayCityForecastType)
    }

    useQuery(
        ["posts", searchValue],
        () => fetchForecastCityData(searchValue),
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            enabled: !!searchValue.id,
            onSuccess: handleRequestSuccess,
            onError: handleErrorRedirect(navigate)
        }
    )

    const getCurrentCoords = (): LatLngTuple => {
        if (data.lat && data.lon) {
            return [data.lat, data.lon]
        }

        //координаты Екатеринбурга
        return [56.837650, 60.594530]
    }

    return (
        <Wrapper>
            <MainSearchField />
            <div>
                <InteractiveMap coords={getCurrentCoords()}/>
            </div>
        </Wrapper>
    );
};


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export default Map;