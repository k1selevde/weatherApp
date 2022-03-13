import React, {useEffect} from 'react';
import Icon from '../../../../shared/ui-kit/Icon/Icon';
import {DayCityForecastType} from "../../../../types";
import Cover from '../../../../shared/ui-kit/Cover/Cover';
import styled from "styled-components";
import {getDateByMask, IsEmptyObject} from "../../../../shared/helpers/common";

type Props = {
    data: DayCityForecastType
}

//timed
const sunPhasesTimeMaskOptions = {hour: 'numeric', minute: 'numeric'}

const DayData: React.FC<Props> = ({data}) => {
    const Container = styled.section`
      display: grid;
      grid-gap: 20px;
    `

    const RotatedIconWindWrapper = styled.div`
      height: fit-content;
      width: fit-content;
      transform: rotate(${(`${data.wind_deg}deg`)});
    `

    const WindWrapper = styled.div`
      padding: .6em;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
      min-width: 150px;
    `

    const renderWindSection = () => {
        return (
            <Cover>
                <WindWrapper>
                    <div>
                        <Icon iconType={'windsock'}/>
                    </div>
                    <div>{data.wind_speed} m/s</div>
                    <div>
                        <RotatedIconWindWrapper>
                            <Icon iconType={'arrow'} />
                        </RotatedIconWindWrapper>
                    </div>
                </WindWrapper>
            </Cover>
        )
    }



    const renderSunPhases = () => {
        return (
            <Cover>
                <div>
                    <div className="page-wrap v-center">
                        <div className="content-wrap">
                            <svg width="200" height="100" viewBox="0 0 100 45" xmlns="http://www.w3.org/2000/svg">
                                <path id="sunPath" d="M10 30 C 30 5, 70 5, 90 30" stroke="black" fill="transparent"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div>
                    <p>sunrise: {getDateByMask(data.sunrise * 1000, sunPhasesTimeMaskOptions)}</p>
                    <p>sunset: {getDateByMask(data.sunset * 1000, sunPhasesTimeMaskOptions)}</p>
                </div>
            </Cover>
        )
    }

    const renderPressure = () => (
        <Cover>
            <p>Pressure: {data.pressure}</p>
        </Cover>
    )

    const renderHumidity = () => (
        <Cover>
            <p>Humidity: {data.humidity}</p>
        </Cover>
    )

    if (IsEmptyObject(data)) return null

    return (
        <Container>
            {renderWindSection()}
            {renderSunPhases()}
            {renderPressure()}
            {renderHumidity()}
        </Container>
    );
};

export default DayData;
