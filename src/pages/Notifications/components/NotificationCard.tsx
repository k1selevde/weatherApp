import React from 'react';
import {LocaleStateType} from "../../../i18n";
import Cover from "../../../shared/ui-kit/Cover";
import styled from "styled-components";
import { localeDateOptions } from '../../../settings/settings';
import {NotificationType} from "../notifications.state";
import { ArrayAndNotEmpty } from '../../../shared/helpers/common';

type Props = {
    data: NotificationType
    locale: LocaleStateType
}

const NotificationCard = ({data, locale}: Props) => {
    const dates = (
        <DateBlock>
            {new Date(data.start * 1000).toLocaleDateString(locale, localeDateOptions)}
            &nbsp;-&nbsp;
            {new Date(data.end * 1000).toLocaleDateString(locale, localeDateOptions)}
        </DateBlock>
    )

    const tags = (
        <Tags>
            {data.tags.map(item => <Tag>"{item}"</Tag>)}
        </Tags>
    )

    return (
        <Cover>
            <Wrapper>
                <Header>
                    <Sender>{data.sender_name || `Unknown sender`}</Sender>
                    {dates}
                </Header>
                {ArrayAndNotEmpty(data.tags) && tags}
                <Description>{data.description}</Description>
            </Wrapper>
        </Cover>
    );
};


const Wrapper = styled.div`
      color: var(--selected-inner-color);
      user-select: none;
      display: flex;
      gap: 10px;
      padding: 1em;
      border-radius: 10px;
      flex-direction: column;
      overflow: hidden;
    `

const Sender = styled.h6`
      font-size: 18px;
      font-weight: 700;
    `
const Description = styled.p`
      font-size: 16px;
      font-weight: 400;
      word-wrap: anywhere;
    `

const Header = styled.div`
      display: flex;
      justify-content: space-between;
    `

const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
`

const Tag = styled.li`
  padding: 5px;
  background-color: var(--selected-faded-color);
  color: var(--selected-active-color);
  border-radius: 5px;
`

const DateBlock = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`

export default NotificationCard;