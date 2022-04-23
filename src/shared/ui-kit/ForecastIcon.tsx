import React from 'react';
import { RestIconsIdType } from '../../types';

import picture01 from '../assets/static/01.svg'
import picture02 from '../assets/static/02.svg'
import picture03 from '../assets/static/03.svg'
import picture04 from '../assets/static/04.svg'
import picture09 from '../assets/static/09.svg'
import picture10 from '../assets/static/10.svg'
import picture11 from '../assets/static/11.svg'
import picture13 from '../assets/static/13.svg'

const pictures: {[key: string]: string} = {
    '01': picture01,
    '02': picture02,
    '03': picture03,
    '04': picture04,
    '09': picture09,
    '10': picture10,
    '11': picture11,
    '13': picture13,
    'default': picture01
}

type Props = {
    code: RestIconsIdType
}

const ForecastIcon = ({code}: Props) => {

    const getIconPath = (type: string): string => {
        return pictures[type] || pictures["default"]
    }

    /**
     * @param {RestIconsIdType} code - код иконки погоды
     * @return {string} возвращает код иконки погоды без привязки к времени суток или пустую строку
     * */
    const convertIconCode = (code: RestIconsIdType): string => {
        return code.slice(0, -1) ?? ""
    }

    return (
        <div>
            <img src={getIconPath(convertIconCode(code))} alt="weather picture"/>
        </div>
    );
};

export default ForecastIcon;