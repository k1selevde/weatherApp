import React from 'react';
import {useIntl} from "react-intl";
import {useRecoilState, useRecoilValue} from "recoil";
import styled from "styled-components";
import {localeState} from "../../i18n";
import {ArrayAndNotEmpty} from "../../shared/helpers/common";
import useDocumentTitle from "../../shared/hooks/useDocumentTitle";
import Icon from '../../shared/ui-kit/Icon';
import FavoriteCard from "./components/FavoriteCard";
import {favoritesState} from "./favorites.state";

const Favorites = () => {
    const intl = useIntl()

    useDocumentTitle(intl.formatMessage({id: "tab.favorites"}))

    const locale = useRecoilValue(localeState)
    const [favorites, setFavorites] = useRecoilState(favoritesState)

    const handleDeleteCard = (id: string) => setFavorites(prev => prev.filter(item => item.id !== id))

    const list = (
        <List>
            {favorites
                .map((card, index) => <FavoriteCard key={index} data={card} onDelete={handleDeleteCard} locale={locale} />)
            }
        </List>
    )

    const empty = (
        <EmptyWrapper>
            <p>{intl.formatMessage({id: "favorites.empty"})}</p>
            <Icon iconType={'noData'} />
        </EmptyWrapper>
    )

    return (
        <>
            <Caption>{intl.formatMessage({id: "favorites.title"})}</Caption>
            <div>
                {ArrayAndNotEmpty(favorites) ? list : empty}
            </div>
        </>
    );
};


const Caption = styled.h4`
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 2em;
    `

const List = styled.ul`
        display: flex;
        flex-direction: column;
        gap: 15px;
    `

const EmptyWrapper = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 30px
`

export default Favorites;