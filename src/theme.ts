//пока нет логики использую только эту
import {DefaultTheme} from "styled-components";

const themeLight: DefaultTheme = {
    active: '#FFBB6A',
    default: '#FFF8B8',
    faded: '#FFFCE4',
};


const themeDark: DefaultTheme = {
    active: '#36393B',
    default: '#595959',
    faded: '#989898',
}

export {
    themeLight,
    themeDark
}