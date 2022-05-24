import React, {memo} from 'react';
import styled from 'styled-components';
import {LocaleStateType} from "../../../i18n";
import {kelvinToCelsius} from "../../../shared/helpers/common";
import ForecastIcon from "../../../shared/ui-kit/ForecastIcon";
import Icon from "../../../shared/ui-kit/Icon";
import {DayCityForecastType} from "../../../types";

type Props  = {
    data: DayCityForecastType
    onClick: (day: DayCityForecastType) => void
    isActive: boolean
    locale: LocaleStateType
}

const localeDateOptions = { year: 'numeric', month: 'long', day: '2-digit'} as const;

const TempByDay = ({data, onClick, isActive, locale}: Props) => {
    const dayNightTemp = (
        <TempsWrapper>
            <TempContent>
                <p>{kelvinToCelsius(data.temp.day)} ℃</p>
                <Icon iconType={'miniSun'} />
            </TempContent>

            <TempContent>
                <p>{kelvinToCelsius(data.temp.night)} ℃</p>
                <Icon iconType={'miniMoon'} />
            </TempContent>
        </TempsWrapper>
    )

    const date = (
        <DateContent>
            {new Date(data.dt * 1000).toLocaleDateString(locale, localeDateOptions)}
        </DateContent>
    )

    return (
        <CardWrapper isActive={isActive} onClick={() => onClick(data)}>
            <CardInner>
                {date}
                {dayNightTemp}
                <ForecastIcon code={data?.weather[0]?.icon} />
            </CardInner>
        </CardWrapper>
    );
};


const CardWrapper = styled.div<{isActive: boolean}>`
      color: var(--selected-inner-color);
      border-radius: 10px;
      background: ${({isActive}) => isActive ? `var(--selected-active-color)` : `var(--selected-default-color)`};
      transition: background-color ease .2s;
      padding: 12px;
      cursor: pointer;
      width: 300px;
      min-height: 88px;
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

const TempContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  
  p {
    font-weight: 700;
  }
`

const DateContent = styled.div`
  white-space: nowrap;
  overflow: hidden;
  max-width: 200px;
`


export default memo(TempByDay);