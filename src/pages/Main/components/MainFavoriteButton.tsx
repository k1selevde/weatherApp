import React, {useEffect, useState} from 'react';
import {useIntl} from "react-intl";
import {useRecoilState} from 'recoil';
import styled from "styled-components";
import {IsEmptyObject} from "../../../shared/helpers/common";
import {OptionAutocompleteInputType} from '../../../types';
import {favoritesState} from "../../Favorites/favorites.state";

type Props = {
    currentValue: OptionAutocompleteInputType
}

const MainFavoriteButton = ({currentValue}: Props) => {
    const intl = useIntl()

    const [disabled, setDisabled] = useState(true)
    const [favorites, setFavorites] = useRecoilState(favoritesState)

    useEffect(() => {
        const isValueInFavorites: boolean = favorites.findIndex(item => item.id === currentValue.id) >= 0
        const isNotValidValue: boolean = IsEmptyObject(currentValue)

        setDisabled(isValueInFavorites || isNotValidValue)
    }, [currentValue, favorites])


    const getNewItem = () => ({
            ...currentValue,
        date: new Date().getTime()
    })


    return (
        <div>
            <Button
                onClick={() => setFavorites(prev => [...prev, getNewItem()])}
                disabled={disabled}
            >
                {intl.formatMessage({id: "main.favoriteBtn"})}
            </Button>
        </div>
    );
};


const Button = styled.button`
    height: 100%;
    padding: 4px 10px;
    border: 1px solid var(--selected-active-color);
    border-radius: 10px;
    transition: all .5s ease;
    &:hover {
      background-color: var(--selected-active-color);
      color: var(--selected-inner-color)
    }
    &:disabled {
      pointer-events: none;
      opacity: .3;
    }
`

export default MainFavoriteButton;
