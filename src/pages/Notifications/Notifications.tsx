import React from 'react';
import useDocumentTitle from "../../shared/hooks/useDocumentTitle";
import Alert from "./components/Alert/Alert";
import styled from "styled-components";

export type AlertCardType = {
    title: string,
    id: number,
    description: string,
    iconCode: string,
    date: number
}

const testData: Array<AlertCardType> = [
    {
        title: 'Moscow',
        id: 23,
        description: 'rkwe lkrwe k ;lerw krlwe;r kwe',
        iconCode: 'ewr',
        date: 1648403951967
    },
    {
        title: 'Moscow',
        id: 1,
        description: 'rkwe lkrwe k ;lerw krlwe;r kwe',
        iconCode: 'ewr',
        date: 1648403951967
    },
    {
        title: 'Moscow',
        id: 2,
        description: 'rkwe lkrwe k ;lerw krlwe;r kwe',
        iconCode: 'ewr',
        date: 1648403951967
    },
    {
        title: 'Moscow',
        id: 3,
        description: 'rkwe lkrwe k ;lerw krlwe;r kwe',
        iconCode: 'ewr',
        date: 1648403951967
    },
    {
        title: 'Moscow',
        id: 4,
        description: 'rkwe lkrwe k ;lerw krlwe;r kwe',
        iconCode: 'ewr',
        date: 1648403951967
    },
    {
        title: 'Moscow',
        id: 5,
        description: 'rkwe lkrwe k ;lerw krlwe;r kwe',
        iconCode: 'ewr',
        date: 1648403951967
    },
]

const Notifications = () => {
    useDocumentTitle('Notifications')

    return (
        <div>
            <Caption>Notifications</Caption>
            <List>
                {testData.map((alert, index) => <Alert key={alert.id} data={alert} />)}
            </List>
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
        gap: 15px;
        flex-direction: column;
    `

export default Notifications;