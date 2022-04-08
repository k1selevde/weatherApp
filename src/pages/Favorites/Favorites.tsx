import React from 'react';
import useDocumentTitle from "../../shared/hooks/useDocumentTitle";
import FavoriteCard from "./components/FavoriteCard/FavoriteCard";
import styled from "styled-components";

const Favorites = () => {

    useDocumentTitle('Favorite')

    const testData = [
        {
            title: 'Moscow',
            id: 'test-id1',
            date: 1648403951967
        },
        {
            title: 'New-York',
            id: 'test-id2',
            date: 1648403951967
        },
        {
            title: 'Saratov',
            id: 'test-id3',
            date: 1648403951967
        },
        {
            title: 'Tagil',
            id: 'test-id4',
            date: 1648403951967
        },
    ]

    const Caption = styled.h4`
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 2em;
    `

    const List = styled.ul`
        display: flex;
        gap: 15px;
        flex-direction: column;
    `

    return (
        <div>
            <Caption>Favorites list</Caption>
            <div>
                <List>
                    {testData.map((card, index) => <FavoriteCard key={index} data={card} />)}
                </List>
            </div>
        </div>
    );
};

export default Favorites;