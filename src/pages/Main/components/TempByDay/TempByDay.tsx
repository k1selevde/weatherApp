import React, { memo } from 'react';
import {DayCityForecastType} from "../../../../types";
import ForecastIcon from "../../../../shared/ui-kit/ForecastIcon/ForecastIcon";
import styled from 'styled-components';
import Icon from "../../../../shared/ui-kit/Icon/Icon";
import {kelvinToCelsius} from "../../../../shared/helpers/common";

type Props  = {
    data: DayCityForecastType
    onClick: (day: DayCityForecastType) => void
    isActive: boolean
}



const TempByDay: React.FC<Props> = ({data, onClick, isActive}) => {


    const CardWrapper = styled.div`
      border-radius: 10px;
      background-color: ${({theme}) => isActive ? theme.active : theme.default};
      transition: background-color ease .2s;
      padding: 12px;
      cursor: pointer;
      width: 300px;
      &:hover {
        background-color: ${props => props.theme.active}
      }
    `

    const CardInner = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-around;
    `

    const TempsWrapper = styled.div`
      display: flex;
      gap: 10px;
    `

    const renderDayNightTemp = () => (
        <TempsWrapper>
            <div>
                <p>{kelvinToCelsius(data.temp.day)} C</p>
                <Icon iconType={'miniSun'} />
            </div>
            <div>
                <p>{kelvinToCelsius(data.temp.night)} C</p>
                <Icon iconType={'miniMoon'} />
            </div>
        </TempsWrapper>
    )

    const renderDate = () => (
        <div style={{whiteSpace: 'nowrap'}}>
            {new Date(data.dt * 1000).toDateString()}
        </div>
    )

    return (
        <CardWrapper onClick={() => onClick(data)}>
            <CardInner>
                {renderDate()}
                {renderDayNightTemp()}
                <ForecastIcon code={data?.weather[0]?.icon} />
            </CardInner>
        </CardWrapper>
    );
};

export default memo(TempByDay);