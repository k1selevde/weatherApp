import {LatLngTuple} from "leaflet";
import React from 'react';
import {useIntl} from "react-intl";
import {Marker, Popup} from "react-leaflet";
import {Link} from "react-router-dom";
import {useRecoilValue} from "recoil";
import styled from "styled-components";
import {localeState} from "../../../i18n";
import {kelvinToCelsius} from "../../../shared/helpers/common";
import ForecastIcon from "../../../shared/ui-kit/ForecastIcon";
import {CurrentCityForecastType} from "../../../types";

type Props = {
    coords: LatLngTuple,
    data: CurrentCityForecastType
    title?: string
}

const dateOptions = {year: '2-digit', month: '2-digit', day: '2-digit'} as const;

const CustomMarker = ({coords, data, title}: Props) => {
    const intl = useIntl()

    const locale = useRecoilValue(localeState)

    const cityName = title?.split(',')[0];
    const otherTitle = ',' + title?.split(',').slice(1).join(',')

    const popupInfo = (
        <Top>
            <IconWrapper><ForecastIcon code={data?.weather[0]?.icon}/></IconWrapper>
            <Info>
                <Title><strong>{cityName}</strong>{otherTitle}</Title>
                <InfoBottom>
                    <div>
                        {new Date().toLocaleDateString(locale, dateOptions)}
                    </div>
                    <Temp>
                        {kelvinToCelsius(data.feels_like)} ℃
                    </Temp>
                </InfoBottom>
            </Info>
        </Top>
    )

    const popupLink = (
        <div>
            <Link to={"/"}>
                {intl.formatMessage({id: "map.popup.linkMore"})}
            </Link>
        </div>
    )

    const popupContent = (
        <Content>
            {popupInfo}
            {popupLink}
        </Content>
    )

    return (
        <Marker position={coords} >
            <Popup>
                {popupContent}
            </Popup>
        </Marker>
    );
};


const Content = styled.div`
  min-width: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Top = styled.div`
      display: flex;
      gap: 2px;
`

const Info = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2px;
`

const InfoBottom = styled.div`
      display: flex;
      align-items: center;
      gap: 10px
`

const Temp = styled.p`
      white-space: nowrap;
      font-weight: 600;
      font-size: 14px;
`

const Title = styled.h4`
      max-width: 95px;
      word-break: break-word;
      text-overflow: ellipsis;
      display: -webkit-box;
      overflow: hidden;
      line-clamp: 3;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      strong {
        font-weight: 700;
      }
`

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
`

export default CustomMarker