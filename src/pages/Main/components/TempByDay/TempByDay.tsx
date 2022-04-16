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

const TempByDay = ({data, onClick, isActive}: Props) => {
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
        <CardWrapper isActive={isActive} onClick={() => onClick(data)}>
            <CardInner>
                {renderDate()}
                {renderDayNightTemp()}
                <ForecastIcon code={data?.weather[0]?.icon} />
            </CardInner>
        </CardWrapper>
    );
};


const CardWrapper = styled.div<{isActive: boolean}>`
      border-radius: 10px;
      background: ${({isActive}) => isActive ? `var(--selected-active-color)` : `var(--selected-default-color)`};
      transition: background-color ease .2s;
      padding: 12px;
      cursor: pointer;
      width: 300px;
      &:hover {
        background-color: var(--selected-active-color)
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

export default memo(TempByDay);