import React, {useCallback} from 'react';
import Slider from "react-slick";
import IconButton from '../../../../shared/ui-kit/IconButton/IconButton';
import TempByDay from "../TempByDay/TempByDay";
import {useRecoilState} from "recoil";
import {mainDailyForecastState, mainDayForecastState} from "../../main.state";
import { ArrayAndNotEmpty } from '../../../../shared/helpers/common';
import { DayCityForecastType } from '../../../../types';
import styled from 'styled-components';


const PrevArrow = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`

const NextArrow = styled.div`
  bottom: 0;
  left: 0;
`

const ContainerList = styled.div`
  width: 400px;
`


const ArrowPrev = (props: any) => {
    const { onClick } = props;

    return (
        <PrevArrow onClick={onClick}>
            <IconButton iconType={'arrowUp'}/>
        </PrevArrow>
    )
}

const ArrowNext = (props: any) => {
    const { onClick } = props;
    return (
        <NextArrow onClick={onClick}>
            <IconButton iconType={'arrowDown'}/>
        </NextArrow>
    )
}



const settings = {
    arrows: true,
    dots:  false,
    slidesToShow: 4,
    infinite: false,
    vertical: true,
    prevArrow: <ArrowPrev />,
    nextArrow: <ArrowNext />,
};

const WeekCarousel: React.FC = () => {
    const [data, _] = useRecoilState(mainDailyForecastState)
    const [currentDay, setDay] = useRecoilState(mainDayForecastState)

    //@ts-ignore
    const {daily} = data

    const handleClickSliderItem = useCallback((day: DayCityForecastType) => {
        setDay(day)
    }, [])

    const renderSlider = () => (
        <Slider {...settings}>
            {daily?.map((day: DayCityForecastType) => (
                <TempByDay key={day.dt} data={day} onClick={handleClickSliderItem} isActive={currentDay.dt === day.dt}/>
            ))}
        </Slider>
    )

    return (
        <>
            {ArrayAndNotEmpty(daily) &&
            <ContainerList>
                {renderSlider()}
            </ContainerList>
            }
        </>
    );
};

export default WeekCarousel;