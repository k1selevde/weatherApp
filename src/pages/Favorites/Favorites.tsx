import React from 'react';
import useDocumentTitle from "../../shared/hooks/useDocumentTitle";
import FavoriteCard from "./components/FavoriteCard/FavoriteCard";
import styled from "styled-components";

export type FavoriteCardType = {
    title: string,
    id: number,
    date: number | string
}

const testData: Array<FavoriteCardType> = [
    {
        title: 'Moscow',
        id: 2431,
        date: 1648403951967
    },
    {
        title: 'New-York',
        id: 4321,
        date: 1648403951967
    },
    {
        title: 'Saratov',
        id: 5522,
        date: 1648403951967
    },
    {
        title: 'Tagil',
        id: 7666,
        date: 1648403951967
    },
]

const Favorites = () => {

    useDocumentTitle('Favorite')

    return (
        <div>
            <Caption>Favorites list</Caption>
            <div>
                <List>
                    {testData.map((card, index) => <FavoriteCard key={card.id | index} data={card} />)}
                </List>
            </div>
        </div>
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

export default Favorites;