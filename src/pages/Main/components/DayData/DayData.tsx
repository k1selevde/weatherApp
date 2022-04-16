import React from 'react';
import Icon from '../../../../shared/ui-kit/Icon/Icon';
import {DayCityForecastType} from "../../../../types";
import Cover from '../../../../shared/ui-kit/Cover/Cover';
import styled from "styled-components";
import {getDateByMask, IsEmptyObject} from "../../../../shared/helpers/common";

type Props = {
    data: DayCityForecastType
}

const sunPhasesTimeMaskOptions = {hour: 'numeric', minute: 'numeric'}

const DayData = ({data}: Props) => {
    const renderWindSection = () => {
        return (
            <Cover>
                <WindWrapper>
                    <div>
                        <Icon iconType={'windsock'}/>
                    </div>
                    <div>{data.wind_speed} m/s</div>
                    <div>
                        <RotatedIconWindWrapper rotates={data.wind_deg}>
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


const Container = styled.section`
      display: grid;
      grid-gap: 20px;
    `

const RotatedIconWindWrapper = styled.div<{rotates: string | number}>`
      height: fit-content;
      width: fit-content;
      transform: rotate(${(props) => `${props.rotates}deg`});
    `;

const WindWrapper = styled.div`
      padding: .6em;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
      min-width: 150px;
    `

export default DayData;
