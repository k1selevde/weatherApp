import React, {useCallback} from 'react';
import Slider from "react-slick";
import IconButton from '../../../../shared/ui-kit/IconButton/IconButton';
import TempByDay from "../TempByDay/TempByDay";
import {useRecoilState, useRecoilValue} from "recoil";
import {mainDailyForecastState, mainDayForecastState} from "../../main.state";
import { ArrayAndNotEmpty } from '../../../../shared/helpers/common';
import { DayCityForecastType } from '../../../../types';
import styled from 'styled-components';

/*
* TODO-k1selevde: Возможно в будущем придет в голову как играться со слайдером и решение проблем нескольких проблем, например: холостого прокручивания в начало
*/
// const PrevArrow = styled.div`
//   position: absolute;
//   top: 50%;
//   display: block;
//   padding: 0;
//   transform: translate(0, -50%);
//   cursor: pointer;
//   z-index: 1;
//   right: 3%
// `
//
// const NextArrow = styled.div`
//   position: absolute;
//   top: 50%;
//   display: block;
//   padding: 0;
//   transform: translate(0, -50%);
//   cursor: pointer;
//   z-index: 1;
//   left: 3%
// `
//
// const ArrowPrev = (props: any) => {
//     const { onClick } = props;
//
//     return (
//         <PrevArrow onClick={onClick}>
//             <IconButton iconType={'arrowUp'}/>
//         </PrevArrow>
//     )
// }
//
// const ArrowNext = (props: any) => {
//     const { onClick } = props;
//     return (
//         <NextArrow onClick={onClick}>
//             <IconButton iconType={'arrowDown'}/>
//         </NextArrow>
//     )
// }



// const settings = {
//     arrows: true,
//     dots:  false,
//     slidesToShow: 3,
//     infinite: false,
//     // vertical: true,
//     prevArrow: <ArrowPrev />,
//     nextArrow: <ArrowNext />,
// };

const WeekCarousel = () => {
    const data = useRecoilValue(mainDailyForecastState)
    const [currentDay, setDay] = useRecoilState(mainDayForecastState)

    const {daily} = data

    const handleClickSliderItem = useCallback((day: DayCityForecastType) => {
        setDay(day)
    }, [])

    const list = (
        // <Slider {...settings}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            {daily?.slice(0,5).map((day: DayCityForecastType) => (
                <TempByDay key={day.dt} data={day} onClick={handleClickSliderItem} isActive={currentDay.dt === day.dt}/>
            ))}
        </div>
    )

    return (
        <>
            {ArrayAndNotEmpty(daily) && list}
        </>
    );
};

export default WeekCarousel;