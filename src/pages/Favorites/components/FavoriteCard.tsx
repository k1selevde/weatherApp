import React from 'react';
import styled from 'styled-components';
import {LocaleStateType} from "../../../i18n";
import { localeDateOptions } from '../../../settings/settings';
import Cover from '../../../shared/ui-kit/Cover';
import Icon from '../../../shared/ui-kit/Icon';
import {FavoriteCardType} from "../../../types";

type Props = {
    data: FavoriteCardType
    onDelete: (id: string) => void
    locale: LocaleStateType
}

const FavoriteCard = ({data, locale, onDelete}: Props) => {
    return (
        <Cover>
            <Wrapper>
                <LeftPart>
                    <p>{new Date(data.date).toLocaleDateString(locale, localeDateOptions)}</p>
                    <p>{data.title}</p>
                </LeftPart>

                <Button onClick={() => onDelete(data.id)} >
                    <Icon iconType={'trash'} />
                </Button>
            </Wrapper>
         </Cover>
    );
};

const Wrapper = styled.div`
      color: var(--selected-inner-color);
      user-select: none;
      display: flex;
      justify-content: space-between;
      padding: 1em;
      align-content: space-between;
    `

const LeftPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Button = styled.button`
  cursor: pointer;
`

export default FavoriteCard;