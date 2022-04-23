import React from 'react';
import {useIntl} from "react-intl";
import styled from "styled-components";
import {getDateByMask, IsEmptyObject} from "../../../shared/helpers/common";
import Cover from '../../../shared/ui-kit/Cover';
import Icon from '../../../shared/ui-kit/Icon';
import {DayCityForecastType} from "../../../types";

type Props = {
    data: DayCityForecastType
}

const sunPhasesTimeMaskOptions = {hour: 'numeric', minute: 'numeric'}

const DayData = ({data}: Props) => {
    const intl = useIntl()

    const wind = (
        <Cover>
            <WindContainer>
                <Icon iconType={'windsock'}/>
                <Text>
                    <TextValue>{data.wind_speed}</TextValue>
                    &nbsp;
                    m/s
                </Text>
                <RotatedIconWindWrapper rotates={data.wind_deg}>
                    <Icon iconType={'arrow'} />
                </RotatedIconWindWrapper>
            </WindContainer>
        </Cover>
    )

    const sunPhases = (
        <Cover>
            <SunContainer>
                <Icon iconType={'sunPhases'} />
                <SunContent>
                    <Text>
                        {intl.formatMessage({id: "main.data.sunrise"})}
                        &nbsp;
                        <TextValue>
                            {getDateByMask(data.sunrise * 1000, sunPhasesTimeMaskOptions)}
                        </TextValue>
                    </Text>
                    <Text>
                        {intl.formatMessage({id: "main.data.sunset"})}
                        &nbsp;
                        <TextValue>
                            {getDateByMask(data.sunset * 1000, sunPhasesTimeMaskOptions)}
                        </TextValue>
                    </Text>
                </SunContent>
            </SunContainer>
        </Cover>
    )


    const pressure = (
        <Cover>
            <CenterContent>
                <Text>
                    {intl.formatMessage({id: "main.data.pressure"})}
                    :&nbsp;
                    <TextValue>
                        {data.pressure}
                    </TextValue>
                </Text>
            </CenterContent>
        </Cover>
    )

    const humidity = (
        <Cover>
            <CenterContent>
                <Text>
                    {intl.formatMessage({id: "main.data.humidity"})}
                    :&nbsp;
                    <TextValue>
                        {data.humidity}
                    </TextValue>
                </Text>
            </CenterContent>
        </Cover>
    )

    if (IsEmptyObject(data)) return null

    return (
        <Container>
            {wind}
            {sunPhases}
            {pressure}
            {humidity}
        </Container>
    );
};


const Container = styled.section`
  display: grid;
  grid-gap: 20px;
`

const Text = styled.p`
  color: var(--selected-inner-color);
`

const TextValue = styled.span`
  font-weight: 700;
  color: var(--selected-inner-color);
`

const CenterContent = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 150px;
`

const SunContainer = styled(CenterContent)`
  flex-direction: column;
  gap: 20px;
`

const SunContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const RotatedIconWindWrapper = styled.div<{ rotates: string | number }>`
  height: fit-content;
  width: fit-content;
  transform: rotate(${(props) => `${props.rotates}deg`});
`;

const WindContainer = styled(CenterContent)`
  padding: .6em;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`

export default DayData;
