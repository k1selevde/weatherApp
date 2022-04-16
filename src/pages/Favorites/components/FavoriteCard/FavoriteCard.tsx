import React from 'react';
import styled from 'styled-components';
import Cover from '../../../../shared/ui-kit/Cover/Cover';
import Icon from '../../../../shared/ui-kit/Icon/Icon';
import {FavoriteCardType} from "../../Favorites";

type Props = {
    data: FavoriteCardType
}

const FavoriteCard = ({data}: Props) => {
    return (
        <Cover>
            <Wrapper>
                <LeftPart>
                    <p>{new Date(data.date).toDateString()}</p>
                    <p>{data.title}</p>
                </LeftPart>

                <button>
                    <Icon iconType={'trash'} />
                </button>
            </Wrapper>
         </Cover>
    );
};

const Wrapper = styled.div`
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

export default FavoriteCard;