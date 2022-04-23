import React from 'react';
import Cover from "../../../../shared/ui-kit/Cover/Cover";
import styled from "styled-components";
import {AlertCardType} from "../../Notifications";

type Props = {
    data: AlertCardType
}

const Alert = ({data: {title, description, date}}: Props) => {
    return (
        <Cover>
            <Wrapper>
                <Header>
                    <Title>{title}</Title>
                    <div>{new Date(date).toDateString()}</div>
                </Header>
                <Description>{description}</Description>
            </Wrapper>
        </Cover>
    );
};


const Wrapper = styled.div`
      display: flex;
      gap: 10px;
      padding: 1em;
      border-radius: 10px;
      flex-direction: column;
      min-width: 400px;
    `

const Title = styled.h6`
      font-size: 18px;
      font-weight: 700;
      color: black;
    `
const Description = styled.p`
      font-size: 13px;
      font-weight: 400;
      color: black;
    `

const Header = styled.div`
      display: flex;
      justify-content: space-between;
    `

export default Alert;