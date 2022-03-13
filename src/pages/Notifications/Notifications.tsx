import React from 'react';
import useDocumentTitle from "../../shared/hooks/useDocumentTitle";
import Alert from "./components/Alert/Alert";
import styled from "styled-components";

const testData = [
    {
        title: 'Moscow',
        id: 'Moscow',
        description: 'rkwe lkrwe k ;lerw krlwe;r kwe',
        iconCode: 'ewr',
        date: 1648403951967
    },
    {
        title: 'Moscow',
        id: 'Moscow',
        description: 'rkwe lkrwe k ;lerw krlwe;r kwe',
        iconCode: 'ewr',
        date: 1648403951967
    },
    {
        title: 'Moscow',
        id: 'Moscow',
        description: 'rkwe lkrwe k ;lerw krlwe;r kwe',
        iconCode: 'ewr',
        date: 1648403951967
    },
    {
        title: 'Moscow',
        id: 'Moscow',
        description: 'rkwe lkrwe k ;lerw krlwe;r kwe',
        iconCode: 'ewr',
        date: 1648403951967
    },
    {
        title: 'Moscow',
        id: 'Moscow',
        description: 'rkwe lkrwe k ;lerw krlwe;r kwe',
        iconCode: 'ewr',
        date: 1648403951967
    },
    {
        title: 'Moscow',
        id: 'Moscow',
        description: 'rkwe lkrwe k ;lerw krlwe;r kwe',
        iconCode: 'ewr',
        date: 1648403951967
    },
]

const Notifications = () => {

    useDocumentTitle('Notifications')

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
            <Caption>Notifications</Caption>
            <List>
                {testData.map(alert => <Alert data={alert} />)}
            </List>
        </div>
    );
};

export default Notifications;