import React from 'react';
import styled from 'styled-components';
import Cover from '../../../../shared/ui-kit/Cover/Cover';

type Props = {
    data: {
        title: string,
        date: number | string
    }
}

const FavoriteCard: React.FC<Props> = ({data}) => {
    const Wrapper = styled.div`
      display: flex;
      padding: 1em;
      align-content: baseline;
    `


    return (
        <Cover>
            <Wrapper>
                <p>{data.title}</p>
                <p>{new Date(data.date).toDateString()}</p>
                <button>delete</button>
            </Wrapper>
        </Cover>
    );
};

export default FavoriteCard;