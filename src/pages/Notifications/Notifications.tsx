import React, {ChangeEvent, useState} from 'react';
import {useIntl} from "react-intl";
import {useQuery} from "react-query";
import {useNavigate} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import styled from "styled-components";
import {fetchNotifications} from '../../api';
import {localeState} from "../../i18n";
import spinner from '../../shared/assets/animated/spinner.svg'
import {ArrayAndNotEmpty, handleErrorRedirect, IsEmptyObject} from '../../shared/helpers/common';
import useDocumentTitle from "../../shared/hooks/useDocumentTitle";
import Icon from "../../shared/ui-kit/Icon";
import {FavoriteCardType, OneCallRestType} from "../../types";
import {favoritesState} from "../Favorites/favorites.state";
import NotificationCard from "./components/NotificationCard";
import {notificationsState} from "./notifications.state";

const Notifications = () => {
    const intl = useIntl()
    const navigate = useNavigate()

    const emptyCitiesMsg = intl.formatMessage({id: "notifications.emptyCities"})
    const emptyAlertsMsg = intl.formatMessage({id: "notifications.emptyAlerts"})

    useDocumentTitle(intl.formatMessage({id: "tab.notifications"}))

    const [notifications, setNotifications] = useRecoilState(notificationsState)
    const favorites = useRecoilValue(favoritesState)
    const locale = useRecoilValue(localeState)

    const [city, setCity] = useState(favorites[0] || {})

    const handleRequestSuccess = (data: OneCallRestType) => {
        setNotifications(data?.alerts || [])
    }

    const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const option = favorites.find(item => item.id === e.target.value)

        setCity(option || {} as FavoriteCardType)
    }

    const { isLoading } = useQuery<OneCallRestType>(
        ["alerts", city],
        () => fetchNotifications(city),
        {
            enabled: !IsEmptyObject(city),
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            onError: handleErrorRedirect(navigate),
            onSuccess: handleRequestSuccess
        }
    )


    const notificationsList = (
        <List>
            {notifications.map((item, index) => <NotificationCard key={index} data={item} locale={locale} />)}
        </List>
    )

    const favoriteSelect = (
        <Select
            name="fCitySelect"
            id="fCitySelect"
            onChange={handleCityChange}
        >
            {favorites
                .map((item, key) => <option key={key} value={item.id}>{item.title}</option>)
            }
        </Select>
    )

    const renderEmpty = (msg: string) => (
        <EmptyWrapper>
            <p>{msg}</p>
            <Icon iconType={'noData'} />
        </EmptyWrapper>
    )


    const renderNotificationsContent = () => {
        switch (true) {
            case isLoading:
                return <img src={spinner} alt="loading..." width={90} height={90} />
            case ArrayAndNotEmpty(notifications):
                return notificationsList
            default: return renderEmpty(emptyAlertsMsg)
        }

    }

    const content = (
        <Content>
            {favoriteSelect}
            {renderNotificationsContent()}
        </Content>
    )

    return (
        <>
            <Caption>{intl.formatMessage({id: 'notifications.title'})}</Caption>
            {ArrayAndNotEmpty(favorites) ? content : renderEmpty(emptyCitiesMsg)}
        </>
    );
};


const Caption = styled.h4`
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 3em;
    `

const Content = styled.div`
      display: flex;
      flex-direction: column;
      gap: 15px;
`

const List = styled.ul`
        display: flex;
        gap: 15px;
        flex-direction: column;
    `

const EmptyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px
`

const Select = styled.select`
  border: 1px solid var(--selected-active-color);
  border-radius: 7px;
  margin-bottom: 2em;
  padding: 7px;
  width: 340px;
`

export default Notifications;